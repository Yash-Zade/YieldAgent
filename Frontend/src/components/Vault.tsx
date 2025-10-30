// import React, { useState } from 'react';
// import { Card, CardHeader, CardBody, CardFooter } from '@heroui/card';
// import { Button } from '@heroui/button';
// import { Input } from '@heroui/input';
// import { Progress } from '@heroui/progress';
// import { Chip } from '@heroui/chip';
// import { Tabs, Tab } from '@heroui/tabs';
// import { Divider } from '@heroui/divider';
// import { 
//   TrendingUp, 
//   Wallet, 
//   PieChart, 
//   ArrowUpRight, 
//   ArrowDownRight,
//   RefreshCw,
//   AlertCircle,
//   Info
// } from 'lucide-react';

// const VaultDashboard = () => {
//   const [depositAmount, setDepositAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [activeTab, setActiveTab] = useState('deposit');

//   // Mock data - replace with actual contract data
//   const vaultStats = {
//     totalDeposited: '1,234.56',
//     totalWithdrawn: '456.78',
//     totalAssets: '2,345.67',
//     totalShares: '2,100.00',
//     userBalance: '150.00',
//     userShares: '142.50',
//     estimatedAPY: '12.5',
//     performanceFee: '10',
//     withdrawalFee: '0.5'
//   };

//   const strategies = [
//     { 
//       name: 'Aave Strategy', 
//       address: '0x1234...5678',
//       balance: '800.00', 
//       apy: '8.5', 
//       allocation: '35',
//       active: true 
//     },
//     { 
//       name: 'Compound Strategy', 
//       address: '0x8765...4321',
//       balance: '700.00', 
//       apy: '15.2', 
//       allocation: '30',
//       active: true 
//     },
//     { 
//       name: 'Yearn Strategy', 
//       address: '0xabcd...efgh',
//       balance: '600.00', 
//       apy: '14.8', 
//       allocation: '25',
//       active: true 
//     },
//     { 
//       name: 'Reserve', 
//       address: 'Vault',
//       balance: '245.67', 
//       apy: '0', 
//       allocation: '10',
//       active: true 
//     }
//   ];

//   const handleDeposit = () => {
//     console.log('Depositing:', depositAmount);
//     // Implement deposit logic
//   };

//   const handleWithdraw = () => {
//     console.log('Withdrawing:', withdrawAmount);
//     // Implement withdraw logic
//   };

//   const handleRebalance = () => {
//     console.log('Rebalancing vault');
//     // Implement rebalance logic
//   };

//   const handleHarvest = () => {
//     console.log('Harvesting yields');
//     // Implement harvest logic
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
//       {/* Header Section */}
//       <div className="text-center space-y-2">
//         <h1 className="text-4xl font-bold">
//           <span className="text-white">Yield </span>
//           <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
//             Vault
//           </span>
//         </h1>
//         <p className="text-default-500 text-lg">
//           Automated yield optimization across multiple DeFi strategies
//         </p>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20">
//           <CardBody className="flex flex-row items-center gap-3">
//             <div className="p-3 bg-violet-500/20 rounded-full">
//               <TrendingUp className="w-6 h-6 text-violet-500" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm text-default-500">Estimated APY</span>
//               <span className="text-2xl font-bold text-violet-500">
//                 {vaultStats.estimatedAPY}%
//               </span>
//             </div>
//           </CardBody>
//         </Card>

//         <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
//           <CardBody className="flex flex-row items-center gap-3">
//             <div className="p-3 bg-blue-500/20 rounded-full">
//               <Wallet className="w-6 h-6 text-blue-500" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm text-default-500">Total Assets</span>
//               <span className="text-2xl font-bold text-blue-500">
//                 {vaultStats.totalAssets} ETH
//               </span>
//             </div>
//           </CardBody>
//         </Card>

//         <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
//           <CardBody className="flex flex-row items-center gap-3">
//             <div className="p-3 bg-green-500/20 rounded-full">
//               <ArrowUpRight className="w-6 h-6 text-green-500" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm text-default-500">Your Balance</span>
//               <span className="text-2xl font-bold text-green-500">
//                 {vaultStats.userBalance} ETH
//               </span>
//             </div>
//           </CardBody>
//         </Card>

//         <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
//           <CardBody className="flex flex-row items-center gap-3">
//             <div className="p-3 bg-orange-500/20 rounded-full">
//               <PieChart className="w-6 h-6 text-orange-500" />
//             </div>
//             <div className="flex flex-col">
//               <span className="text-sm text-default-500">Your Shares</span>
//               <span className="text-2xl font-bold text-orange-500">
//                 {vaultStats.userShares} yvETH
//               </span>
//             </div>
//           </CardBody>
//         </Card>
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Deposit/Withdraw Section */}
//         <Card className="lg:col-span-1">
//           <CardHeader className="flex flex-col gap-1 px-6 pt-6">
//             <h2 className="text-xl font-semibold">Manage Position</h2>
//             <p className="text-sm text-default-500">Deposit or withdraw assets</p>
//           </CardHeader>
//           <CardBody className="px-6 pb-6">
//             <Tabs 
//               selectedKey={activeTab} 
//               onSelectionChange={setActiveTab}
//               color="primary"
//               variant="bordered"
//               fullWidth
//             >
//               <Tab key="deposit" title="Deposit">
//                 <div className="space-y-4 mt-4">
//                   <Input
//                     type="number"
//                     label="Amount"
//                     placeholder="0.00"
//                     value={depositAmount}
//                     onChange={(e) => setDepositAmount(e.target.value)}
//                     endContent={
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-default-400">ETH</span>
//                         <Button 
//                           size="sm" 
//                           color="primary" 
//                           variant="flat"
//                           className="min-w-unit-12 h-6"
//                         >
//                           MAX
//                         </Button>
//                       </div>
//                     }
//                   />
//                   <div className="flex justify-between text-sm">
//                     <span className="text-default-500">You will receive:</span>
//                     <span className="font-semibold">
//                       {depositAmount || '0.00'} yvETH
//                     </span>
//                   </div>
//                   <Button 
//                     color="primary" 
//                     variant="shadow" 
//                     fullWidth
//                     size="lg"
//                     startContent={<ArrowUpRight className="w-5 h-5" />}
//                     onClick={handleDeposit}
//                   >
//                     Deposit
//                   </Button>
//                   <div className="flex items-start gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
//                     <Info className="w-4 h-4 text-blue-500 mt-0.5" />
//                     <p className="text-xs text-default-600">
//                       Your deposit will be automatically rebalanced across strategies
//                     </p>
//                   </div>
//                 </div>
//               </Tab>
//               <Tab key="withdraw" title="Withdraw">
//                 <div className="space-y-4 mt-4">
//                   <Input
//                     type="number"
//                     label="Amount"
//                     placeholder="0.00"
//                     value={withdrawAmount}
//                     onChange={(e) => setWithdrawAmount(e.target.value)}
//                     endContent={
//                       <div className="flex items-center gap-2">
//                         <span className="text-sm text-default-400">yvETH</span>
//                         <Button 
//                           size="sm" 
//                           color="primary" 
//                           variant="flat"
//                           className="min-w-unit-12 h-6"
//                         >
//                           MAX
//                         </Button>
//                       </div>
//                     }
//                   />
//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-default-500">You will receive:</span>
//                       <span className="font-semibold">
//                         {withdrawAmount || '0.00'} ETH
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-default-500">Withdrawal fee ({vaultStats.withdrawalFee}%):</span>
//                       <span className="text-red-500">
//                         -{((parseFloat(withdrawAmount) || 0) * 0.005).toFixed(4)} ETH
//                       </span>
//                     </div>
//                   </div>
//                   <Button 
//                     color="danger" 
//                     variant="shadow" 
//                     fullWidth
//                     size="lg"
//                     startContent={<ArrowDownRight className="w-5 h-5" />}
//                     onClick={handleWithdraw}
//                   >
//                     Withdraw
//                   </Button>
//                   <div className="flex items-start gap-2 p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
//                     <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
//                     <p className="text-xs text-default-600">
//                       A {vaultStats.withdrawalFee}% withdrawal fee applies to all withdrawals
//                     </p>
//                   </div>
//                 </div>
//               </Tab>
//             </Tabs>
//           </CardBody>
//         </Card>

//         {/* Strategies Section */}
//         <Card className="lg:col-span-2">
//           <CardHeader className="flex flex-row items-center justify-between px-6 pt-6">
//             <div className="flex flex-col gap-1">
//               <h2 className="text-xl font-semibold">Active Strategies</h2>
//               <p className="text-sm text-default-500">Assets allocation across DeFi protocols</p>
//             </div>
//             <div className="flex gap-2">
//               <Button 
//                 color="primary" 
//                 variant="flat"
//                 size="sm"
//                 startContent={<RefreshCw className="w-4 h-4" />}
//                 onClick={handleHarvest}
//               >
//                 Harvest
//               </Button>
//               <Button 
//                 color="primary" 
//                 variant="shadow"
//                 size="sm"
//                 startContent={<PieChart className="w-4 h-4" />}
//                 onClick={handleRebalance}
//               >
//                 Rebalance
//               </Button>
//             </div>
//           </CardHeader>
//           <CardBody className="px-6 pb-6">
//             <div className="space-y-4">
//               {strategies.map((strategy, index) => (
//                 <div key={index} className="space-y-2">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="flex flex-col">
//                         <span className="font-semibold">{strategy.name}</span>
//                         <span className="text-xs text-default-400">
//                           {strategy.address}
//                         </span>
//                       </div>
//                       <Chip 
//                         size="sm" 
//                         color={strategy.active ? "success" : "default"}
//                         variant="flat"
//                       >
//                         {strategy.active ? 'Active' : 'Inactive'}
//                       </Chip>
//                     </div>
//                     <div className="flex flex-col items-end">
//                       <span className="text-sm font-semibold text-green-500">
//                         {strategy.apy}% APY
//                       </span>
//                       <span className="text-xs text-default-400">
//                         {strategy.balance} ETH
//                       </span>
//                     </div>
//                   </div>
//                   <Progress 
//                     value={parseFloat(strategy.allocation)}
//                     color={
//                       index === 0 ? "primary" :
//                       index === 1 ? "secondary" :
//                       index === 2 ? "success" : "warning"
//                     }
//                     size="sm"
//                     showValueLabel={true}
//                     label={`${strategy.allocation}% allocation`}
//                     className="max-w-full"
//                   />
//                   {index < strategies.length - 1 && <Divider className="my-2" />}
//                 </div>
//               ))}
//             </div>
//           </CardBody>
//         </Card>
//       </div>

//       {/* Vault Info */}
//       <Card>
//         <CardHeader className="px-6 pt-6">
//           <h2 className="text-xl font-semibold">Vault Information</h2>
//         </CardHeader>
//         <CardBody className="px-6 pb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="space-y-1">
//               <span className="text-sm text-default-500">Total Deposited</span>
//               <p className="text-lg font-semibold">{vaultStats.totalDeposited} ETH</p>
//             </div>
//             <div className="space-y-1">
//               <span className="text-sm text-default-500">Total Withdrawn</span>
//               <p className="text-lg font-semibold">{vaultStats.totalWithdrawn} ETH</p>
//             </div>
//             <div className="space-y-1">
//               <span className="text-sm text-default-500">Performance Fee</span>
//               <p className="text-lg font-semibold">{vaultStats.performanceFee}%</p>
//             </div>
//             <div className="space-y-1">
//               <span className="text-sm text-default-500">Total Supply</span>
//               <p className="text-lg font-semibold">{vaultStats.totalShares} yvETH</p>
//             </div>
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default VaultDashboard;
import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { 
  Wallet, 
  TrendingUp, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Gift,
  PieChart,
  RefreshCw
} from "lucide-react";

export default function YieldVaultPage() {
  const [assetBalance, setAssetBalance] = useState("1000.00");
  const [vaultShares, setVaultShares] = useState("500.00");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [isDepositing, setIsDepositing] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [activeField, setActiveField] = useState<'deposit' | 'withdraw'>('deposit');
  const [vaultStats] = useState({
    totalAssets: "12456.78",
    totalShares: "11234.56",
    estimatedAPY: "12.5"
  });

  const handleAirdrop = () => {
    // Simulate airdrop
    const newBalance = (parseFloat(assetBalance) + 10000).toFixed(2);
    setAssetBalance(newBalance);
    alert("Airdrop successful! +10,000 ETH added to your balance");
  };

  const handleDeposit = () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert("Please enter a valid deposit amount.");
      return;
    }

    setIsDepositing(true);
    
    // Simulate deposit
    setTimeout(() => {
      const newAssetBalance = (parseFloat(assetBalance) - parseFloat(depositAmount)).toFixed(2);
      const newShares = (parseFloat(vaultShares) + parseFloat(depositAmount)).toFixed(2);
      
      setAssetBalance(newAssetBalance);
      setVaultShares(newShares);
      setDepositAmount('');
      setIsDepositing(false);
      alert("Deposit successful!");
    }, 1500);
  };

  const handleWithdraw = () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert("Please enter a valid withdrawal amount.");
      return;
    }

    if (parseFloat(withdrawAmount) > parseFloat(vaultShares)) {
      alert("Insufficient shares to withdraw.");
      return;
    }

    setIsWithdrawing(true);
    
    // Simulate withdrawal with 0.5% fee
    setTimeout(() => {
      const fee = parseFloat(withdrawAmount) * 0.005;
      const amountAfterFee = parseFloat(withdrawAmount) - fee;
      const newAssetBalance = (parseFloat(assetBalance) + amountAfterFee).toFixed(2);
      const newShares = (parseFloat(vaultShares) - parseFloat(withdrawAmount)).toFixed(2);
      
      setAssetBalance(newAssetBalance);
      setVaultShares(newShares);
      setWithdrawAmount('');
      setIsWithdrawing(false);
      alert(`Withdrawal successful! Fee: ${fee.toFixed(4)} ETH`);
    }, 1500);
  };

  const handleHarvest = () => {
    setIsHarvesting(true);
    setTimeout(() => {
      setIsHarvesting(false);
      alert("Harvest successful! Yields collected from all strategies.");
    }, 2000);
  };

  const handleRebalance = () => {
    setIsRebalancing(true);
    setTimeout(() => {
      setIsRebalancing(false);
      alert("Rebalance successful! Assets redistributed across strategies.");
    }, 2000);
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">
            Yield <span className="text-violet-600">Vault</span>
          </h1>
          <p className="text-foreground-500">Automated yield optimization across DeFi strategies</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10">
            <CardBody className="flex flex-row items-center gap-3 py-4">
              <div className="p-2 bg-violet-500/20 rounded-lg">
                <TrendingUp className="text-violet-500" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-foreground-500">Estimated APY</span>
                <span className="text-xl font-bold text-violet-500">
                  {vaultStats.estimatedAPY}%
                </span>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <CardBody className="flex flex-row items-center gap-3 py-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <PieChart className="text-blue-500" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-foreground-500">Total Assets</span>
                <span className="text-xl font-bold text-blue-500">
                  {parseFloat(vaultStats.totalAssets).toFixed(2)} ETH
                </span>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <CardBody className="flex flex-row items-center gap-3 py-4">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Wallet className="text-green-500" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-foreground-500">Your Shares</span>
                <span className="text-xl font-bold text-green-500">
                  {parseFloat(vaultShares).toFixed(4)} yvETH
                </span>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Wallet Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Wallet className="text-primary" size={18} />
                <h3 className="text-lg font-semibold">Your Wallet</h3>
              </div>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="bg-default-100 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground-500">Asset Balance</span>
                  <Chip color="primary" variant="flat" size="sm">
                    {parseFloat(assetBalance).toFixed(4)} ETH
                  </Chip>
                </div>
                <Divider />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground-500">Vault Shares</span>
                  <Chip color="success" variant="flat" size="sm">
                    {parseFloat(vaultShares).toFixed(4)} yvETH
                  </Chip>
                </div>
              </div>

              <Button
                color="secondary"
                variant="flat"
                size="lg"
                onPress={handleAirdrop}
                startContent={<Gift size={18} />}
                className="w-full"
              >
                Get Test Tokens
              </Button>

              <div className="flex gap-2">
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  onPress={handleHarvest}
                  startContent={<TrendingUp size={16} />}
                  className="flex-1"
                  isLoading={isHarvesting}
                  isDisabled={isHarvesting}
                >
                  Harvest
                </Button>
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  onPress={handleRebalance}
                  startContent={<RefreshCw size={16} />}
                  className="flex-1"
                  isLoading={isRebalancing}
                  isDisabled={isRebalancing}
                >
                  Rebalance
                </Button>
              </div>
            </CardBody>
          </Card>

          {/* Vault Operations */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <h3 className="text-xl font-semibold">Vault Operations</h3>
            </CardHeader>
            <CardBody className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Deposit Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <ArrowUpCircle className="text-success" size={18} />
                    <h4 className="font-medium">Deposit</h4>
                  </div>
                  <Input
                    type="number"
                    label="Amount (ETH)"
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    onFocus={() => setActiveField('deposit')}
                    size="lg"
                  />
                  <Button
                    color="success"
                    size="lg"
                    onPress={handleDeposit}
                    startContent={<ArrowUpCircle size={18} />}
                    className="w-full"
                    isLoading={isDepositing}
                    isDisabled={!depositAmount || parseFloat(depositAmount) <= 0 || isDepositing}
                  >
                    {isDepositing ? "Depositing..." : "Deposit"}
                  </Button>
                </div>

                {/* Withdraw Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <ArrowDownCircle className="text-danger" size={18} />
                    <h4 className="font-medium">Withdraw</h4>
                  </div>
                  <Input
                    type="number"
                    label="Amount (ETH)"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    onFocus={() => setActiveField('withdraw')}
                    size="lg"
                  />
                  <Button
                    color="danger"
                    variant="bordered"
                    size="lg"
                    onPress={handleWithdraw}
                    startContent={<ArrowDownCircle size={18} />}
                    className="w-full"
                    isLoading={isWithdrawing}
                    isDisabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || isWithdrawing}
                  >
                    {isWithdrawing ? "Withdrawing..." : "Withdraw"}
                  </Button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-default-100 p-4 rounded-lg">
                <h5 className="font-medium mb-3 text-sm">Quick Actions</h5>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      const value =
                        activeField === 'deposit'
                          ? (parseFloat(assetBalance) * 0.25).toFixed(2)
                          : (parseFloat(vaultShares) * 0.25).toFixed(2);

                      activeField === 'deposit' ? setWithdrawAmount("") : setDepositAmount("");
                      activeField === 'deposit'
                        ? setDepositAmount(value)
                        : setWithdrawAmount(value);
                    }}
                  >
                    25%
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      const value =
                        activeField === 'deposit'
                          ? (parseFloat(assetBalance) * 0.5).toFixed(2)
                          : (parseFloat(vaultShares) * 0.5).toFixed(2);

                      activeField === 'deposit' ? setWithdrawAmount("") : setDepositAmount("");
                      activeField === 'deposit'
                        ? setDepositAmount(value)
                        : setWithdrawAmount(value);
                    }}
                  >
                    50%
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      const value =
                        activeField === 'deposit'
                          ? (parseFloat(assetBalance) * 0.75).toFixed(2)
                          : (parseFloat(vaultShares) * 0.75).toFixed(2);

                      activeField === 'deposit' ? setWithdrawAmount("") : setDepositAmount("");
                      activeField === 'deposit'
                        ? setDepositAmount(value)
                        : setWithdrawAmount(value);
                    }}
                  >
                    75%
                  </Button>
                  <Button
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      const value =
                        activeField === 'deposit'
                          ? parseFloat(assetBalance).toFixed(2)
                          : parseFloat(vaultShares).toFixed(2);

                      activeField === 'deposit' ? setWithdrawAmount("") : setDepositAmount("");
                      activeField === 'deposit'
                        ? setDepositAmount(value)
                        : setWithdrawAmount(value);
                    }}
                  >
                    Max
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Info Notice */}
        <Card className="bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800">
          <CardBody className="py-3">
            <div className="flex items-center justify-center space-x-2 text-violet-700 dark:text-violet-300">
              <TrendingUp size={16} />
              <span className="text-sm">
                Assets are automatically rebalanced across strategies for optimal yields
              </span>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}