<script>
	import { ethStore, web3, selectedAccount, connected } from 'svelte-web3';
	import { getELTBurned, getELTInContract, getHODLInContract, getTokenBalance, getTotalHodlReward, approveELT, swap } from './js/web3Helper';

	// Creates a connection to own infura node.
	const enable = () => ethStore.setProvider("https://ropsten.infura.io/v3/952d8bd0e20b4bbfac856dc18285b6ca");
	const enableBrowser = () => ethStore.setBrowserProvider();

	$: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000';
	$: balance = $connected ? $web3.eth.getBalance(checkAccount) : '';
	$: eltBalance = $connected ? getTokenBalance($web3, checkAccount, "0xa84a0b15d7c62684b71fecb5ea8efe0e5af1d11b") : '';
	$: hodlBalance = $connected ? getTokenBalance($web3, checkAccount, "0x5c85a93991671dc5886203e0048777a4fd219983") : '';
	$: totalHodlReward = $connected ? getTotalHodlReward($web3, 10000, 25) : '';
	$: hodlInContract = $connected ? getHODLInContract($web3) : '';
	$: eltInContract = $connected ? getELTInContract($web3) : '';
	$: eltBurned = $connected ? getELTBurned($web3) : '';
	
	function approveELTTransfer() {
		if($connected) {
			approveELT($web3, 10000, $selectedAccount, "0x77189634909a4ad77b7e60c89b5ed5af5ce37d5e");
		}
	}

	function sendSwap() {
		if($connected) {
			swap($web3, 10000, 25, $selectedAccount)
		}
	}

	// Connect to Metamask
	enableBrowser();
</script>

<main>
	<button on:click={approveELTTransfer}>Approve ELT Transfer</button>
	<button on:click={sendSwap}>Start Swap</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>