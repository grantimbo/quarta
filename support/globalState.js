import React from "react";
import app from "./firebase";
import {
  doc,
  getDocs,
  onSnapshot,
  getFirestore,
  collection,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const Context = React.createContext();

export const GlobalState = () => {
  return React.useContext(Context);
};

const d = new Date();
const m = ("0" + (d.getMonth() + 1)).slice(-2);
const y = d.getFullYear();
const auth = getAuth();
const db = getFirestore();

export class GlobalStateProvider extends React.Component {
  authUnsub = null;
  profileListener = null;

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

  async loadAllUserData() {
    const { uid } = this.state;

    if (!uid) {
      return {
        allItems: [],
        total: { income: 0, expense: 0, balance: 0 },
      };
    }

    const userDataCol = collection(db, `users/${uid}/data`);
    const snapshot = await getDocs(userDataCol);

    const allItems = [];
    const total = {
      income: 0,
      expense: 0,
      balance: 0,
    };

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      if (Array.isArray(data?.data)) {
        allItems.push(...data.data);
      }

      if (data?.total) {
        total.income += data.total.income || 0;
        total.expense += data.total.expense || 0;
        total.balance += data.total.balance || 0;
      }
    });

    this.setState({
      data: allItems,
      total,
    });

    return { allItems, total };
  }

  listenForProfile(uid) {
    const getData = async () => {
      const userData = collection(db, `users/${uid}/data`);
      const docSnap = await getDocs(userData);

      this.setState({
        monthList: docSnap.docs.map((doc) => doc.id),
      });
    };

    getData();

    this.profileListener = onSnapshot(doc(db, "users", uid), (doc) => {
      this.setState({ profile: doc.data() });
    });
  }

  componentDidMount() {
    this.authUnsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({
          uid: user.uid,
          email: user.email,
          loggedIn: true,
        });
        this.listenForProfile(user.uid);
      } else {
        this.setState({
          uid: null,
          email: null,
          profile: {},
          loggedIn: false,
          notifications: [],
          monthList: [],
          data: [],
          total: {
            income: 0,
            expense: 0,
            balance: 0,
          },
        });
        if (this.profileListener) {
          this.profileListener();
          this.profileListener = null;
        }
      }
    });
  }

  componentWillUnmount() {
    if (this.authUnsub) {
      this.authUnsub();
      this.authUnsub = null;
    }
    if (this.profileListener) {
      this.profileListener();
      this.profileListener = null;
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          set: (key, value) => this.set(key, value),
          notify: (kind, msg) => this.notify(kind, msg),
          loadAllUserData: () => this.loadAllUserData(),
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
