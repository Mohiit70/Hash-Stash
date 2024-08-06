import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import FileStorage from './components/FileStorage';
import TokenManagement from './components/TokenManagement';
import ConsensusService from './components/ConsensusService';
import SmartContractInteraction from './components/SmartContractInteraction';
import NFTMinting from './components/NFTMinting';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">File Storage</Link></li>
            <li><Link to="/token">Token Management</Link></li>
            <li><Link to="/consensus">Consensus Service</Link></li>
            <li><Link to="/smart-contract">Smart Contract</Link></li>
            <li><Link to="/nft">NFT Minting</Link></li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={FileStorage} />
          <Route path="/token" component={TokenManagement} />
          <Route path="/consensus" component={ConsensusService} />
          <Route path="/smart-contract" component={SmartContractInteraction} />
          <Route path="/nft" component={NFTMinting} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;