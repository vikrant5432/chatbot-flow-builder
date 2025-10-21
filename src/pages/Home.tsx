import { Provider } from "react-redux";
import ChatInterface from "../components/chat-interface/ChatInterface";
import FlowBuilder from "../components/flow-builder/FlowBuilder";
import Header from "../components/header/Header";
import SettingPanel from "../components/settings/SettingPanel";
import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { store } from "../lib/store/store";

const MainContent = () => {
  const selectedNodeId = useAppSelector((state) => state.flow.selectedNodeId);
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[hsl(220,20%,97%)] text-[hsl(222,47%,11%)]">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        {!selectedNodeId && <Sidebar />}
        <FlowBuilder />
        {selectedNodeId && <SettingPanel />}
      </div>
      <ChatInterface />
    </div>
  );
};

const Home = () => {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
};

export default Home;
