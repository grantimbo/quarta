const NotificationCard = ({ text, type = "success" }) => {
  const types = {
    success: "bg-lime-500",
    error: "bg-red-600",
    info: "bg-slate-300 text-slate-700",
  };
  const icon = {
    success: "done",
    error: "error_outline",
    info: "info_outline",
  };

  return (
    <div
      className={`fade-in flex items-center space-x-2 rounded-lg px-3 py-2 text-sm text-white shadow-md md:px-6 md:py-4 md:text-base ${types[type]}`}
    >
      <span className="material-icons-round text-3xl">
        {icon[type] || icon["success"]}
      </span>
      <span>{text}</span>
    </div>
  );
};

export default NotificationCard;
