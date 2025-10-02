import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Users from "@components/settings/users/Users.tsx";

const SettingsPage = () => {
  return (
    <div className="bg-gray-100 flex justify-center h-full">
      <div className="w-11/12 mt-2 h-full">
        <TabGroup className="h-full">
          <TabList className="tabs tabs-lifted">
            <Tab className="tab data-[active]:tab-active h-full flex-grow">
              Projects
            </Tab>
            <Tab className="tab data-[active]:tab-active">Samples</Tab>
            <Tab className="tab data-[active]:tab-active">Recipes</Tab>
            <Tab className="tab data-[active]:tab-active">Tags</Tab>
            <Tab className="tab data-[active]:tab-active">Users</Tab>
          </TabList>
          <TabPanels className="h-full">
            <TabPanel className="h-full">PROJECTS</TabPanel>
            <TabPanel>SAMPLES</TabPanel>
            <TabPanel>RECIPES</TabPanel>
            <TabPanel>TAGS</TabPanel>
            <TabPanel>
              <Users />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default SettingsPage;
