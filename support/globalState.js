import React from "react";
import { app } from "./firebase";
import { doc, getDoc, onSnapshot, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = typeof window !== "undefined" && app ? getAuth(app) : null;
const db = typeof window !== "undefined" && app ? getFirestore(app) : null;

export const Context = React.createContext();

export const GlobalState = () => {
  return React.useContext(Context);
};

const d = new Date();
const m = ("0" + (d.getMonth() + 1)).slice(-2);
const y = d.getFullYear();

export class GlobalStateProvider extends React.Component {
  authUnsub = null;
  profileListener = null;

  // auth = getAuth(app);
  // db = getFirestore(app);

  state = {
    profile: {},
    notifications: [],
    loggedIn: false,
    activeMonth: `${m}_${y}`,
    monthList: [],
    data: [],
    total: {
      income: 0,
      expense: 0,
      balance: 0,
    },
  };

  set(key, val) {
    this.setState({ [key]: val });
  }

  notify(kind, msg) {
    this.setState({
      notifications: [
        ...this.state.notifications,
        {
          notificationType: kind, // success - error - info
          notificationText: msg,
        },
      ],
    });
  }

  async loadActiveMonthData() {
    if (!db || !this.state.uid) return;
    const { uid, activeMonth } = this.state;

    if (!uid) return;

    try {
      const monthDocRef = doc(db, `users/${uid}/data`, activeMonth);
      const docSnap = await getDoc(monthDocRef);

      if (docSnap.exists()) {
        const docData = docSnap.data();
        this.setState({
          data: docData.data || [],
          total: docData.total || { income: 0, expense: 0, balance: 0 },
        });
        return docData; // Return the actual data found
      } else {
        // If the month doesn't exist yet, reset the view
        this.setState({
          data: [],
          total: { income: 0, expense: 0, balance: 0 },
        });
      }
    } catch (error) {
      this.notify("error", "Failed to load month data.");
    }
  }

  listenForProfile(uid) {
    // Use a single listener for the profile document
    this.profileListener = onSnapshot(
      doc(db, "users", uid),
      (docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();

          this.setState({
            profile: userData,
            // Fallback to empty array if the field doesn't exist yet
            monthList: userData.availableMonths || [],
          });
        }
      },
      (error) => {
        this.notify("error", "Lost connection to profile data.");
      },
    );
  }

  // 1. Initial setup: Listen for Auth changes
  componentDidMount() {
    if (!auth) return; // skip on server / during build
    this.authUnsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState(
          {
            uid: user.uid,
            email: user.email,
            loggedIn: true,
          },
          () => {
            // After state updates, start listeners and load current data
            this.listenForProfile(user.uid);
            this.loadActiveMonthData();
          },
        );
      } else {
        this.cleanupSession();
      }
    });
  }

  // 2. React to activeMonth changes (The "DateSelector" trigger)
  componentDidUpdate(prevProps, prevState) {
    // If the month changed and we have a user, fetch new data
    if (
      prevState.activeMonth !== this.state.activeMonth &&
      this.state.loggedIn
    ) {
      this.loadActiveMonthData();
    }
  }

  // 3. Cleanup logic (moved to a helper to keep things dry)
  cleanupSession() {
    this.setState({
      uid: null,
      email: null,
      profile: {},
      loggedIn: false,
      notifications: [],
      monthList: [],
      data: [],
      total: { income: 0, expense: 0, balance: 0 },
    });

    if (this.profileListener) {
      this.profileListener();
      this.profileListener = null;
    }
  }

  componentWillUnmount() {
    if (this.authUnsub) this.authUnsub();
    if (this.profileListener) this.profileListener();
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          set: (key, value) => this.set(key, value),
          notify: (kind, msg) => this.notify(kind, msg),
          loadActiveMonthData: () => this.loadActiveMonthData(),
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
