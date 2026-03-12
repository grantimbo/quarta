const EditItemFooter = ({ children }) => {
  return (
    <div className="mt-4 flex justify-end space-x-2 border-t border-gray-200 py-2 pt-5 dark:border-slate-700">
      {children}
    </div>
  );
};

export default EditItemFooter;
