import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Button from "../Button";
import Input from "../Input";
import { generateID } from "../../support/generateID";
import MethodSelector from "./MethodSelector";
import InputLabel from "../InputLabel";
import IconSelector from "./IconSelector";

export default function AddCategory({ setAddCategoryModal }) {
  const ctx = useContext(Context);

  const [loading, setLoading] = useState(null);
  const [method, setMethod] = useState(null);
  const [name, setName] = useState(null);
  const [icon, setIcon] = useState(null);

  const addCategory = async () => {
    //check for errors
    if (!name || !icon || method === null) {
      ctx?.notify("error", "Please fill the empty fields");
      return;
    }

    if (!ctx?.uid) {
      ctx?.notify("error", "User not authenticated");
      return;
    }

    //  check for duplicates
    const tmpCategories = [...(ctx?.profile?.categories || [])];
    if (tmpCategories?.find((e) => e?.name === name)) {
      ctx?.notify("error", "Category already exist");
      return;
    }

    setLoading("Saving...");

    // push new items
    tmpCategories.push({
      id: generateID(),
      name: name,
      icon: icon,
      method: method,
    });

    // update profile
    const tmpData = {
      ...ctx?.profile,
      categories: tmpCategories,
    };

    const db = getFirestore();

    try {
      await setDoc(doc(db, "users", ctx.uid), tmpData);

      ctx?.set("profile", tmpData);
      ctx?.notify("success", "Category successfully added");
      setAddCategoryModal(false);
    } catch (e) {
      ctx?.notify("error", "Error adding category");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mt-6 grid">
      <InputLabel text="Name" />
      <Input
        type={"text"}
        color="gray"
        setValue={setName}
        placeholder="Name"
        additionalClasses="mb-4"
      />

      <InputLabel text="Category" />
      <MethodSelector method={method} setMethod={setMethod} />

      <InputLabel text="Icon" />
      <IconSelector icon={icon} setIcon={setIcon} />

      <Button
        onClick={() => addCategory()}
        text="Save Category"
        icon="save"
        loading={loading}
      />
    </div>
  );
}
