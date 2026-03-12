import DashLayout from "../../components/DashLayout";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import Categories from "../../components/Settings/Categories";
import Profile from "../../components/Settings/Profile";
import Title from "../../components/Title";

const Settings = () => {
  return (
    <>
      <Title title="Settings" />

      <DashLayout>
        <BackHomeLink />

        <PageTitle title="Settings" />
        <Profile />
        <PageTitle title="Categories" />
        <Categories />
        {/* <div className="mb-8 grid max-w-sm md:mb-16">
          <PageTitle title="Danger Zone" />
          <Button
            onClick={() => console.log("delete use")}
            text="Delete Account"
            icon="trash"
            color="red"
            // loading={loading}
          />
        </div> */}
      </DashLayout>
    </>
  );
};

export default Settings;
