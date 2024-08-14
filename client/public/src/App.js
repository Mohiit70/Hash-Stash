import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import FileStorage from './components/FileStorage';
import TokenManagement from './components/TokenManagement';
import ConsensusService from './components/ConsensusService';
import SmartContractInteraction from './components/SmartContractInteraction';
import NFTMinting from './components/NFTMinting';
import { HederaProvider } from './contexts/HederaContext';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <HederaProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto mt-8 px-4">
              <Switch>
                <Route path="/" exact component={FileStorage} />
                <Route path="/token" component={TokenManagement} />
                <Route path="/consensus" component={ConsensusService} />
                <Route path="/smart-contract" component={SmartContractInteraction} />
                <Route path="/nft" component={NFTMinting} />
              </Switch>
            </main>
          </div>
        </Router>
      </HederaProvider>
    </ChakraProvider>
  );
}

export default App;