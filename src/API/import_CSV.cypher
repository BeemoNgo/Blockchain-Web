:param {
  file_path_root: 'file:///', 
  file_0: 'nodes.csv',
  file_1: 'relationships.csv',
  idsToSkip: []
};

// CONSTRAINT creation
CREATE CONSTRAINT `imp_uniq_Address_addressId` IF NOT EXISTS FOR (n: `Address`) REQUIRE (n.`addressId`) IS UNIQUE;
CREATE CONSTRAINT unique_transaction_hash IF NOT EXISTS FOR (t:Transaction) REQUIRE t.hash IS UNIQUE;


// NODE load
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/KellyUni/COS30049_DA/main/Assignment2/nodes.csv" AS row
WITH row
WHERE NOT row.`addressId` IN $idsToSkip AND NOT row.`addressId` IS NULL
MERGE (n: `Address` { `addressId`: row.`addressId` })
SET n.name = row.`addressId`  // Setting a "name" property for visualization purposes.
SET n.type = row.`type`;

// RELATIONSHIP load
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/KellyUni/COS30049_DA/main/Assignment2/relationships.csv" AS row
WITH row 
MATCH (source: `Address` { `addressId`: row.`from_address` })
MATCH (target: `Address` { `addressId`: row.`to_address` })
MERGE (source)-[r: `Transaction` {hash: row.`hash`}]->(target)

SET r.`from_address` = row.`from_address`, 
    r.`to_address` = row.`to_address`,
    r.`hash` = row.`hash`,
    r.`transaction_fee` = toInteger(trim(row.`transaction_fee`)),
    r.`block_number` = toInteger(trim(row.`block_number`)),
    r.`block_hash` = row.`block_hash`,
    r.`block_timestamp` = toInteger(trim(row.`block_timestamp`)),
    r.`gas` = row.`gas`,
    r.`gas_used` = row.`gas_used`,
    r.`gas_price` = row.`gas_price`,
    r.`transaction_index` = row.`transaction_index`,
    r.`value` = row.`value`,
    r.`input = row.`input`