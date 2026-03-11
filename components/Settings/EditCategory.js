import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { Context } from "../../support/globalState";
import Button from "../Button";
import Input from "../Input";
import InputLabel from "../InputLabel";
import DeleteCategory from "./DeleteCategory";
import IconSelector from "./IconSelector";

export default function EditCategory(props) {
  const ctx = useContext(Context);
  const { data, setEditCategoryModal } = props;
  const [updating, setUpdating] = useState(null);
  const [name, setName] = useState(data?.name);
  const [icon, setIcon] = useState(data?.icon);

  const updateCategory = async () => {
    if (!name || !icon) {
      ctx?.notify("error", "Please fill in all fields");
      return;
    }

    if (!ctx?.uid) {
      ctx?.notify("error", "User not authenticated");
      return;
    }

    setUpdating("Updating...");

    const currentCategories = ctx?.profile?.categories || [];

    const tmpCategories = currentCategories.map((e) =>
      e?.id === data?.id
        ? {
            ...e,
            name,
            icon,
          }
        : e
    );

    const tmpExpensesIncome = (ctx?.data || []).map((e) =>
      e?.category.name === data?.name
        ? {
            ...e,
            category: {
              name,
              icon,
            },
          }
        : e
    );

    const tmpProfileData = {
      ...ctx?.profile,
      categories: tmpCategories,
    };

    const finalData = {
      data: tmpExpensesIncome,
      total: ctx?.total,
    };

    const db = getFirestore();
    const dataRef = collection(db, `users/${ctx.uid}/data`);

    try {
      await Promise.all([
        setDoc(doc(dataRef, ctx.activeMonth), finalData),
        setDoc(doc(db, "users", ctx.uid), tmpProfileData),
      ]);

      ctx?.set("data", tmpExpensesIncome);
      ctx?.set("profile", tmpProfileData);

      ctx?.notify("success", "Category successfully updated");
      setEditCategoryModal(null);
    } catch (e) {
      ctx?.notify("error", "Error updating category");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="mt-6 grid">
      <InputLabel text="Name" />
      <Input
        type={"text"}
        color="gray"
        value={name}
        setValue={setName}
        placeholder="Name"
        additionalClasses="mb-4"
      />

      <InputLabel text="Icon" />
      <IconSelector icon={icon} setIcon={setIcon} />

      <div className="flex items-center justify-end space-x-2">
        <DeleteCategory {...props} />

        <Button
          onClick={() => updateCategory()}
          text="Update"
          icon="save"
          loading={updating}
        />
      </div>
    </div>
  );
}
