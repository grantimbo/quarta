import InputLabel from "../InputLabel";

const CategoryCard = ({ title, catList, setEditCategoryModal }) => {
  return (
    <div>
      <InputLabel text={title} />
      <div className="grid gap-1 md:gap-2">
        {catList?.map((cat) => {
          return (
            <div
              key={cat?.name}
              onClick={() => setEditCategoryModal(cat)}
              className={`flex cursor-pointer items-center space-x-2 rounded-full border bg-gray-50 px-3 py-1 text-xs text-gray-600 md:px-4 md:py-2 md:text-sm dark:bg-slate-800 dark:text-slate-400`}
            >
              {cat?.icon && (
                <span className="material-icons-round text-lg text-gray-500 md:text-xl dark:text-slate-400">
                  {cat?.icon}
                </span>
              )}
              <span>{cat?.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryCard;
