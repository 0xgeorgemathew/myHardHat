//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {RedirectAll, ISuperToken, IConstantFlowAgreementV1, ISuperfluid} from "./RedirectAll.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TradeableCashflow is ERC721URIStorage, RedirectAll, Ownable {
    constructor(
        address owner,
        string memory _name,
        string memory _symbol,
        ISuperfluid host,
        IConstantFlowAgreementV1 cfa,
        ISuperToken acceptedToken
    ) ERC721(_name, _symbol) RedirectAll(host, cfa, acceptedToken, owner) {
        _mint(owner, 1);
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI)
        public
        onlyOwner
    {
        _setTokenURI(tokenId, _tokenURI);
    }

    function _beforeTokenTransfer(
        address, /*from*/
        address to,
        uint256 /*tokenId*/
    ) internal override {
        _changeReceiver(to);
    }
}
