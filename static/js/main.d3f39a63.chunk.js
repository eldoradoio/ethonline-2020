(this["webpackJsonpdemo-dapp"]=this["webpackJsonpdemo-dapp"]||[]).push([[0],{25:function(f,e,t){f.exports=t.p+"static/media/logo.f01d1720.webp"},28:function(f,e,t){f.exports=t(57)},33:function(f,e,t){},34:function(f,e,t){},52:function(f,e){},53:function(f,e){},54:function(f,e,t){},55:function(f,e,t){},56:function(f,e,t){},57:function(f,e,t){"use strict";t.r(e);var n=t(0),a=t.n(n),r=t(24),s=t.n(r),i=(t(33),t(6)),c=t(25),u=t.n(c),o=(t(34),t(1)),p=t.n(o),l=t(7),d=t(8),b=t(26),y=t.n(b),m=t(2),v=t(3),h=t(9),g=t(10),E=t(4),w=t(5),x=t(20),T=function(f){Object(w.a)(t,f);var e=Object(E.a)(t);function t(f){return Object(m.a)(this,t),e.call(this,O,k,f)}return Object(v.a)(t,[{key:"deploy",value:function(f){return Object(g.a)(Object(h.a)(t.prototype),"deploy",this).call(this,f||{})}},{key:"getDeployTransaction",value:function(f){return Object(g.a)(Object(h.a)(t.prototype),"getDeployTransaction",this).call(this,f||{})}},{key:"attach",value:function(f){return Object(g.a)(Object(h.a)(t.prototype),"attach",this).call(this,f)}},{key:"connect",value:function(f){return Object(g.a)(Object(h.a)(t.prototype),"connect",this).call(this,f)}}],[{key:"connect",value:function(f,e){return new x.a(f,O,e)}}]),t}(x.b),O=[{inputs:[],payable:!1,stateMutability:"nonpayable",type:"constructor"},{constant:!1,inputs:[{internalType:"address",name:"providerAddress",type:"address"},{internalType:"address",name:"_tokenAddress",type:"address"}],name:"addProvider",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"address",name:"_tokenAddress",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"uint256",name:"_providerIndex",type:"uint256"},{internalType:"address",name:"_tokenAddress",type:"address"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"depositAt",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"_tokenAddress",type:"address"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"depositOn",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"_tokenAddress",type:"address"}],name:"getBalance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"_tokenAddress",type:"address"}],name:"getEarnings",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"uint256",name:"index",type:"uint256"}],name:"getProviderByIndex",outputs:[{internalType:"address",name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"_tokenAddress",type:"address"}],name:"getProviderByToken",outputs:[{internalType:"address",name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"providersCount",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"_tokenAddress",type:"address"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"withdrawOn",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"function"}],k="0x608060405234801561001057600080fd5b5061003c6040518060600160405280602a8152602001611005602a913961004160201b610d2c1760201c565b61016e565b610142816040516024018080602001828103825283818151815260200191508051906020019080838360005b8381101561008857808201518184015260208101905061006d565b50505050905090810190601f1680156100b55780820380516001836020036101000a031916815260200191505b50925050506040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff838183161783525050505061014560201b60201c565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b610e888061017d6000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c8063d0659d7511610066578063d0659d75146102b1578063f7888aec146102cf578063f8b2cb4f14610347578063fb3a38411461039f578063fbdbafad146104015761009e565b80630fd61f42146100a3578063131b9c041461010f5780633116b092146101675780639755f5be146101c9578063a50e30711461022d575b600080fd5b6100f9600480360360608110156100b957600080fd5b8101908080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035906020019092919050505061046f565b6040518082815260200191505060405180910390f35b6101516004803603602081101561012557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061048e565b6040518082815260200191505060405180910390f35b6101b36004803603604081101561017d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506105c6565b6040518082815260200191505060405180910390f35b61022b600480360360408110156101df57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105e4565b005b61026f6004803603602081101561024357600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610736565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102b961079f565b6040518082815260200191505060405180910390f35b610331600480360360408110156102e557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506107b0565b6040518082815260200191505060405180910390f35b6103896004803603602081101561035d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506107c4565b6040518082815260200191505060405180910390f35b6103eb600480360360408110156103b557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506107d7565b6040518082815260200191505060405180910390f35b61042d6004803603602081101561041757600080fd5b81019080803590602001909291905050506107f5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60006104853361047e866107f5565b8585610812565b90509392505050565b6000806000905060008090505b6104a56000610966565b8110156105bc576104c081600061097790919063ffffffff16565b73ffffffffffffffffffffffffffffffffffffffff16633f47ab2933866040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b15801561057057600080fd5b505afa158015610584573d6000803e3d6000fd5b505050506040513d602081101561059a57600080fd5b810190808051906020019092919050505082019150808060010191505061049b565b5080915050919050565b60006105dc336105d585610736565b85856109bb565b905092915050565b8173ffffffffffffffffffffffffffffffffffffffff166380b2edd8826040518263ffffffff1660e01b8152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b15801561066357600080fd5b505af1158015610677573d6000803e3d6000fd5b505050506040513d602081101561068d57600080fd5b81019080805190602001909291905050505081600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610731826000610b0f90919063ffffffff16565b505050565b6000600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60006107ab6000610966565b905090565b60006107bc8383610bdf565b905092915050565b60006107d03383610bdf565b9050919050565b60006107ed336107e685610736565b8585610812565b905092915050565b600061080b82600061097790919063ffffffff16565b9050919050565b6000808473ffffffffffffffffffffffffffffffffffffffff16638340f5498786866040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b1580156108d057600080fd5b505af11580156108e4573d6000803e3d6000fd5b505050506040513d60208110156108fa57600080fd5b8101908080519060200190929190505050905080600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555080915050949350505050565b600081600101805490509050919050565b600082600101828154811061098857fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905092915050565b6000808473ffffffffffffffffffffffffffffffffffffffff1663d9caed128786866040518463ffffffff1660e01b8152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050602060405180830381600087803b158015610a7957600080fd5b505af1158015610a8d573d6000803e3d6000fd5b505050506040513d6020811015610aa357600080fd5b8101908080519060200190929190505050905080600360008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555080915050949350505050565b6000610b1b8383610cdd565b610bd457826001018290806001815401808255809150509060018203906000526020600020016000909192909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508360000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060019050610bd9565b600090505b92915050565b6000610bea82610736565b73ffffffffffffffffffffffffffffffffffffffff1663d4fac45d33846040518363ffffffff1660e01b8152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060206040518083038186803b158015610c9a57600080fd5b505afa158015610cae573d6000803e3d6000fd5b505050506040513d6020811015610cc457600080fd5b8101908080519060200190929190505050905092915050565b6000808360000160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541415905092915050565b610e27816040516024018080602001828103825283818151815260200191508051906020019080838360005b83811015610d73578082015181840152602081019050610d58565b50505050905090810190601f168015610da05780820380516001836020036101000a031916815260200191505b50925050506040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610e2a565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa505050505056fea265627a7a72315820d937e2763dce9e4b14429e05de09c382086bfea3a861fa62791020c571a97a7664736f6c634300051000324465706c6f79696e6720456c446f7261646f536176696e67734163636f756e747320436f6e7472616374",j=function(){function f(){Object(m.a)(this,f)}return Object(v.a)(f,null,[{key:"connect",value:function(f,e){return new d.Contract(f,M,e)}}]),f}(),M=[{constant:!1,inputs:[{internalType:"address",name:"_tokenAddress",type:"address"}],name:"approveToken",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"_account",type:"address"},{internalType:"address",name:"_tokenAddress",type:"address"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"deposit",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"_account",type:"address"},{internalType:"address",name:"_tokenAddress",type:"address"}],name:"getBalance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"_account",type:"address"},{internalType:"address",name:"_tokenAddress",type:"address"}],name:"getDeposited",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"_account",type:"address"},{internalType:"address",name:"_tokenAddress",type:"address"}],name:"getEarnings",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getListOfDepositableTokens",outputs:[{internalType:"address[]",name:"",type:"address[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getListOfWithdrawableTokens",outputs:[{internalType:"address[]",name:"",type:"address[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getProviderId",outputs:[{internalType:"bytes32",name:"",type:"bytes32"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getProviderName",outputs:[{internalType:"string",name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getProviderVersion",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"_account",type:"address"},{internalType:"address",name:"_tokenAddress",type:"address"},{internalType:"uint256",name:"_amount",type:"uint256"}],name:"withdraw",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"nonpayable",type:"function"}],A=function(){function f(){Object(m.a)(this,f)}return Object(v.a)(f,null,[{key:"connect",value:function(f,e){return new d.Contract(f,S,e)}}]),f}(),S=[{inputs:[{internalType:"string",name:"name",type:"string"},{internalType:"string",name:"symbol",type:"string"},{internalType:"uint8",name:"decimals",type:"uint8"}],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"owner",type:"address"},{indexed:!0,internalType:"address",name:"spender",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,internalType:"address",name:"from",type:"address"},{indexed:!0,internalType:"address",name:"to",type:"address"},{indexed:!1,internalType:"uint256",name:"value",type:"uint256"}],name:"Transfer",type:"event"},{constant:!0,inputs:[{internalType:"address",name:"owner",type:"address"},{internalType:"address",name:"spender",type:"address"}],name:"allowance",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"spender",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"approve",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{internalType:"address",name:"account",type:"address"}],name:"balanceOf",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"decimals",outputs:[{internalType:"uint8",name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{internalType:"string",name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{internalType:"uint256",name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transfer",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{internalType:"address",name:"sender",type:"address"},{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"transferFrom",outputs:[{internalType:"bool",name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"}],_=new y.a("89eb3ac5-6738-42b7-98c0-3e3ca4a39853","ropsten"),N=new d.ethers.providers.Web3Provider(_.provider),D=N.getSigner(),C=T.connect("0x6Fb4026895de9eB79044ecaCCEf99168B49cF13C",D);function B(){return G.apply(this,arguments)}function G(){return(G=Object(l.a)(p.a.mark((function f(){var e;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,D.getAddress();case 2:return e=f.sent,console.log(e),f.abrupt("return",e);case 5:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function P(f){return F.apply(this,arguments)}function F(){return(F=Object(l.a)(p.a.mark((function f(e){var t;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return t=A.connect(e,N),f.next=3,t.name();case 3:return f.abrupt("return",f.sent);case 4:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function W(f){return I.apply(this,arguments)}function I(){return(I=Object(l.a)(p.a.mark((function f(e){var t,n,a;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return t=A.connect(e,N),f.next=3,B();case 3:return n=f.sent,f.next=6,C.getProviderByToken(e);case 6:return a=f.sent,f.next=9,t.balanceOf(n);case 9:return f.t0=f.sent,f.next=12,t.decimals();case 12:return f.t1=f.sent,f.next=15,t.allowance(n,a);case 15:return f.t2=f.sent,f.abrupt("return",{balance:f.t0,decimals:f.t1,allowance:f.t2});case 17:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function L(){return(L=Object(l.a)(p.a.mark((function f(e){var t;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return console.log("getting balance from",e),f.next=3,C.getBalance(e);case 3:return t=f.sent,console.log("got balance from",e,t),f.next=7,t;case 7:return f.t0=f.sent,f.t1=d.BigNumber.from("1"),f.abrupt("return",{balance:f.t0,decimals:18,allowance:f.t1});case 10:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function R(){return(R=Object(l.a)(p.a.mark((function f(e){var t,n,a;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return t=A.connect(e,D),f.next=3,C.getProviderByToken(e);case 3:return n=f.sent,f.next=6,t.approve(n,d.BigNumber.from("2").pow("256").sub("1"));case 6:return a=f.sent,f.next=9,a.wait();case 9:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function V(){return(V=Object(l.a)(p.a.mark((function f(e,t){var n;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,C.depositOn(e,t,{gasLimit:85e4});case 2:return n=f.sent,f.next=5,n.wait();case 5:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function H(){return(H=Object(l.a)(p.a.mark((function f(e,t){var n;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return console.log("withdrawing",t),f.next=3,C.withdrawOn(e,t,{gasLimit:85e4});case 3:return n=f.sent,f.next=6,n.wait();case 6:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function U(f){for(var e=f.toString(),t="",n=0;n<e.length;n+=2)t+=String.fromCharCode(parseInt(e.substr(n,2),16));return t}function J(f){return z.apply(this,arguments)}function z(){return(z=Object(l.a)(p.a.mark((function f(e){var t,n,a;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,N.getTransaction(e);case 2:return t=f.sent,f.next=5,N.call(t,t.blockNumber);case 5:return n=f.sent,a=U(n.substr(138)),f.abrupt("return",a);case 8:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function $(){return q.apply(this,arguments)}function q(){return(q=Object(l.a)(p.a.mark((function f(){var e,t,n;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,C.providersCount();case 2:return e=f.sent,t=Array.from({length:e.toNumber()},(function(f,e){return C.getProviderByIndex(e)})),f.next=6,Promise.all(t);case 6:return n=f.sent,f.abrupt("return",n);case 8:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function K(f){return Q.apply(this,arguments)}function Q(){return(Q=Object(l.a)(p.a.mark((function f(e){var t,n,a,r,s,i;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return t=j.connect(e,N),f.next=3,t.getProviderName();case 3:return n=f.sent,f.next=6,t.getProviderId();case 6:return a=f.sent,f.next=9,t.getListOfDepositableTokens();case 9:return r=f.sent,f.next=12,Promise.all(r.map(P));case 12:return s=f.sent,i=r.map((function(f,e){return{name:s[e],address:f}})),f.abrupt("return",{id:a,name:n,depositable:i});case 15:case"end":return f.stop()}}),f)})))).apply(this,arguments)}function X(){return(X=Object(l.a)(p.a.mark((function f(){var e,t;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return f.next=2,$();case 2:return e=f.sent,f.next=5,Promise.all(e.map(K));case 5:return t=f.sent,f.abrupt("return",t);case 7:case"end":return f.stop()}}),f)})))).apply(this,arguments)}t(54);function Y(f){var e=f.onClick,t=f.disabled,r=f.children,s=Object(n.useState)(!1),c=Object(i.a)(s,2),u=c[0],o=c[1];return u?a.a.createElement("button",{style:{minWidth:"9rem"}},a.a.createElement("div",{className:"lds-facebook"},a.a.createElement("div",null),a.a.createElement("div",null),a.a.createElement("div",null))):a.a.createElement("button",{style:{minWidth:"9rem"},disabled:t||u,onClick:Object(l.a)(p.a.mark((function f(){var t;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:if(o(!0),!((t=e())instanceof Promise)){f.next=9;break}return o(!0),f.next=6,t;case 6:o(!1),f.next=10;break;case 9:o(!1);case 10:case"end":return f.stop()}}),f)})))},r)}var Z,ff=t(12);t(55);!function(f){f.ADD_MESSAGE="ADD_MESSAGE",f.REMOVE_MESSAGE="REMOVE_MESSAGE"}(Z||(Z={}));var ef=[],tf=a.a.createContext({state:ef,dispatcher:function(){return null}}),nf=function(f,e){switch(console.log("messaging",f,e),e.type){case Z.ADD_MESSAGE:return[].concat(Object(ff.a)(f),[e.message]);case Z.REMOVE_MESSAGE:return f.splice(e.index),Object(ff.a)(f)}};function af(){var f=Object(n.useContext)(tf).state;return a.a.createElement("div",{className:"toasts"},f.map((function(f,e){return a.a.createElement(rf,{index:e,key:"messageindex".concat(e),data:f},f.body)})))}function rf(f){var e=f.data,t=f.children,r=f.index,s=Object(n.useContext)(tf).dispatcher,i=(Date.now()-e.timestamp)/1e3;return a.a.createElement("div",{className:"toast show "+e.type,role:"alert","aria-live":"assertive","aria-atomic":"true"},a.a.createElement("div",{className:"toast-header"},a.a.createElement("strong",{className:"title"}," "),a.a.createElement("small",{className:"time"},i," seconds ago"),a.a.createElement("button",{type:"button","aria-label":"Close",onClick:function(){s({type:Z.REMOVE_MESSAGE,index:r})}},a.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),a.a.createElement("div",{className:"body"},t))}function sf(f){var e=f.tokenName,t=f.balance;return a.a.createElement("span",{style:{display:"flex",flexGrow:1,flexBasis:"1rem",verticalAlign:"middle",lineHeight:"3.5rem"}},a.a.createElement("span",{style:{flexGrow:4,textAlign:"right"}},t?function(f){var e=Math.pow(10,2),t=d.BigNumber.from("1"+"".padEnd(f.decimals-2,"0"));return(f.balance.div(t).toNumber()/e).toFixed(2)}(t):"---"),e?a.a.createElement("span",{style:{width:"6rem",textAlign:"left",paddingLeft:"1rem",fontSize:"1rem"}},e.toLocaleUpperCase()):"")}function cf(f){var e=f.token,t=e.address,r=e.name,s=Object(n.useState)(),c=Object(i.a)(s,2),u=c[0],o=c[1],b=Object(n.useState)(),y=Object(i.a)(b,2),m=(y[0],y[1],Object(n.useState)()),v=Object(i.a)(m,2),h=v[0],g=v[1],E=Object(n.useState)(),w=Object(i.a)(E,2),x=(w[0],w[1],Object(n.useContext)(tf));Object(n.useEffect)((function(){W(t).then(g)}),[t,x.state.length]);var T=function(){var f=Object(l.a)(p.a.mark((function f(e,t){var n;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return f.prev=0,f.next=3,e();case 3:x.dispatcher({message:{body:t||"Action completed!",timestamp:Date.now(),type:"success"},type:Z.ADD_MESSAGE}),f.next=17;break;case 6:if(f.prev=6,f.t0=f.catch(0),n=f.t0,!f.t0.transactionHash){f.next=15;break}return f.next=12,J(f.t0.transactionHash);case 12:n=f.sent,f.next=16;break;case 15:n=f.t0.message?f.t0.message:"string"===typeof f.t0?f.t0:"Unhandled error";case 16:x.dispatcher({message:{body:n,timestamp:Date.now(),type:"error"},type:Z.ADD_MESSAGE});case 17:case"end":return f.stop()}}),f,null,[[0,6]])})));return function(e,t){return f.apply(this,arguments)}}();return a.a.createElement("div",{style:{display:"flex",marginTop:"0.5rem"}},a.a.createElement(sf,{tokenName:r,balance:h}),a.a.createElement("span",{style:{flexGrow:2,flexBasis:"1rem",display:"flex"}},(null===h||void 0===h?void 0:h.allowance.gt("0"))?a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{style:{flexGrow:1,display:"flex"}},a.a.createElement("input",{style:{flexGrow:1},onChange:function(f){try{o(function(f,e){var t=Math.pow(10,2),n="number"==typeof f?f:"string"===typeof f?parseFloat(f):d.BigNumber.from(f).toNumber();n*=t;var a=d.BigNumber.from("1"+"".padEnd(e-2,"0"));return d.BigNumber.from(n.toFixed(0)).mul(a)}(f.target.value,18))}catch(e){o(void 0)}}})),a.a.createElement("span",null,a.a.createElement(Y,{key:t,disabled:!u,onClick:function(){return u?T((function(){return function(f,e){return V.apply(this,arguments)}(t,u)}),"Deposit succeeded!"):void 0}},"Deposit"))):a.a.createElement(Y,{key:t,disabled:!1,onClick:function(){return T((function(){return function(f){return R.apply(this,arguments)}(t)}),"Use of tokens approved")}},"Approve use of tokens")))}function uf(f){var e=f.providers,t=Object(n.useState)(),r=Object(i.a)(t,2);r[0],r[1];Object(n.useEffect)((function(){}),[]);var s=e.map((function(f){var e,t=null===(e=f.depositable)||void 0===e?void 0:e.map((function(f){return a.a.createElement(cf,{key:f.address,token:f})}));return a.a.createElement("div",{className:"provider"},t)}));return a.a.createElement("section",null,s)}t(56);function of(f){var e=f.children,t=f.labels,r=Object(n.useState)(0),s=Object(i.a)(r,2),c=s[0],u=s[1],o=Array.from({length:e.length},(function(f,e){return a.a.createElement("div",{className:"switch-button ".concat(e===c?"selected":""),onClick:function(){return u(e)}},t[e])}));return a.a.createElement("div",{className:"tab-container"},a.a.createElement("div",{className:"switch-container"},o),e[c])}function pf(f){var e=f.tokenAddress,t=f.provider,r=Object(n.useState)("---"),s=Object(i.a)(r,2),c=(s[0],s[1]),u=Object(n.useState)(null===e||void 0===e?void 0:e.address),o=Object(i.a)(u,2),b=o[0],y=o[1],m=Object(n.useState)(),v=Object(i.a)(m,2),h=v[0],g=v[1],E=Object(n.useState)(),w=Object(i.a)(E,2),x=(w[0],w[1]),T=Object(n.useState)(),O=Object(i.a)(T,2),k=O[0],j=O[1],M=Object(n.useContext)(tf);Object(n.useEffect)((function(){b?(W(b).then(x),function(f){return L.apply(this,arguments)}(b).then(j)):(c("---"),x(void 0),j(void 0))}),[e,b,M.state.length]);var A=function(){var f=Object(l.a)(p.a.mark((function f(e,t){var n;return p.a.wrap((function(f){for(;;)switch(f.prev=f.next){case 0:return f.prev=0,f.next=3,e();case 3:M.dispatcher({message:{body:t||"Action completed!",timestamp:Date.now(),type:"success"},type:Z.ADD_MESSAGE}),f.next=17;break;case 6:if(f.prev=6,f.t0=f.catch(0),n=f.t0,!f.t0.transactionHash){f.next=15;break}return f.next=12,J(f.t0.transactionHash);case 12:n=f.sent,f.next=16;break;case 15:n=f.t0.message?f.t0.message:"string"===typeof f.t0?f.t0:"Unhandled error";case 16:M.dispatcher({message:{body:n,timestamp:Date.now(),type:"error"},type:Z.ADD_MESSAGE});case 17:case"end":return f.stop()}}),f,null,[[0,6]])})));return function(e,t){return f.apply(this,arguments)}}();return a.a.createElement("div",{style:{display:"flex",marginTop:"0.5rem"}},a.a.createElement(sf,{tokenName:void 0,balance:k}),a.a.createElement("span",{style:{flexGrow:4,flexBasis:"1rem",display:"flex"}},a.a.createElement(a.a.Fragment,null,a.a.createElement("span",{style:{flexShrink:1,display:"flex"}},a.a.createElement("select",{defaultValue:"-",onChange:function(f){return y(f.target.value)}},a.a.createElement("option",{value:"-",selected:!0,disabled:!0},"Select Token"),t.depositable.map((function(f){return a.a.createElement("option",{value:f.address},f.name)})))),a.a.createElement("span",{style:{flexGrow:1,display:"flex"}},a.a.createElement("input",{style:{flexGrow:1},onChange:function(f){try{g(function(f,e){var t=Math.pow(10,2),n="number"==typeof f?f:"string"===typeof f?parseFloat(f):d.BigNumber.from(f).toNumber();n*=t;var a=d.BigNumber.from("1"+"".padEnd(e-2,"0"));return d.BigNumber.from(n.toFixed(0)).mul(a)}(f.target.value,18))}catch(e){g(void 0)}}})),a.a.createElement("span",null,a.a.createElement(Y,{key:null===e||void 0===e?void 0:e.address,disabled:!h||!b,onClick:function(){return h&&b?A((function(){return function(f,e){return H.apply(this,arguments)}(b,h)}),"Withdraw completed!"):void 0}},"Withdraw")))))}function lf(f){var e=f.providers,t=Object(n.useState)(),r=Object(i.a)(t,2);r[0],r[1];Object(n.useEffect)((function(){}),[]);var s=e.map((function(f){if("mStable"===f.name)return a.a.createElement("div",{className:"provider"},a.a.createElement("div",null,a.a.createElement("strong",null,"USD:"),a.a.createElement(pf,{key:"mstablewithdraw",provider:f})));var e,t=null===(e=f.depositable)||void 0===e?void 0:e.map((function(e){return a.a.createElement(pf,{provider:f,key:"othercoins-".concat(e),tokenAddress:e})}));return a.a.createElement("div",{className:"provider"},a.a.createElement("strong",null,"Other tokens:"),a.a.createElement("div",null,t))}));return a.a.createElement("section",null,s)}function df(f){var e=f.address,t=Object(n.useState)([]),r=Object(i.a)(t,2),s=r[0],c=r[1];Object(n.useEffect)((function(){console.log("effect"),function(){return X.apply(this,arguments)}().then(c)}),[e]);return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,"Connected with: ",function(f){return"".concat(f.substr(0,5),"...").concat(f.substr(f.length-5,f.length))}(e)),a.a.createElement(of,{labels:["Deposit","Withdraw"]},a.a.createElement(uf,{providers:s}),a.a.createElement(lf,{providers:s})))}var bf=function(){var f=Object(n.useState)(),e=Object(i.a)(f,2),t=e[0],r=e[1],s=Object(n.useReducer)(nf,ef),c=Object(i.a)(s,2),o=c[0],p=c[1];return console.log("messageReducer",o),Object(n.useEffect)((function(){B().then(r)}),[t]),a.a.createElement(tf.Provider,{value:{state:o,dispatcher:p}},a.a.createElement("div",{className:"App"},a.a.createElement("menu",null,a.a.createElement("img",{src:u.a,height:"100%"})),a.a.createElement("header",{className:"App-header"},a.a.createElement("h2",null,"Saving Accounts"),t?a.a.createElement(df,{address:t}):a.a.createElement("div",null,"Disconnected")),a.a.createElement(af,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(bf,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(f){f.unregister()})).catch((function(f){console.error(f.message)}))}},[[28,1,2]]]);
//# sourceMappingURL=main.d3f39a63.chunk.js.map