import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Users from "../components/Settings/Users/Users.tsx";

const SettingsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">
      <div className="w-11/12 mt-2">
        <TabGroup>
          <TabList className="tabs tabs-lifted">
            <Tab className="tab data-[active]:tab-active">Projects</Tab>
            <Tab className="tab data-[active]:tab-active">Samples</Tab>
            <Tab className="tab data-[active]:tab-active">Recipes</Tab>
            <Tab className="tab data-[active]:tab-active">Tags</Tab>
            <Tab className="tab data-[active]:tab-active">Users</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>PROJECTS</TabPanel>
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
