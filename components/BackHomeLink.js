import ButtonLink from "./ButtonLink";

const BackHomeLink = () => {
  return (
    <div className="my-2 border-b border-gray-200 pb-3 md:mb-10 md:pb-6 dark:border-slate-600">
      <div className="md:hidden">
        <ButtonLink href="/dash" icon="chevron_left" text="Back" size="sm" />
      </div>
      <div className="hidden md:inline">
        <ButtonLink href="/dash" icon="chevron_left" text="Back" size="md" />
      </div>
    </div>
  );
};

export default BackHomeLink;
