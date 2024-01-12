from fastapi import APIRouter, Query
from datetime import datetime
from connect_GDB import GDB

router = APIRouter()

@router.get("/transaction/{hash}")
async def Address(hash):
    GDB.connect()
    session = GDB.driver.session()

    #Query to retrieve transaction details based on hash
    q1 = """
    MATCH (a:Address)-[t:Transaction]->(b:Address)
    WHERE t.hash = $hash
    RETURN t.hash AS hash, t.from_address AS from_address, t.to_address AS to_address,
        t.value AS value, t.input AS input, t.transaction_index AS transaction_index,
        t.gas AS gas, t.gas_used AS gas_used, t.gas_price AS gas_price,
        t.transaction_fee AS transaction_fee, t.block_number AS block_number,
        t.block_hash AS block_hash, t.block_timestamp AS block_timestamp;
    """
    parameters = {"hash": hash}
    results = session.run(q1, parameters=parameters)
    # Collect the results in a list of dictionaries
    address = [dict(row) for row in results]

    GDB.close()  # Close the driver when done

    return {"response": address}

@router.get("/uniqueTransactions/{Node_Id}")
async def uniqueTransactions(Node_Id):
    GDB.connect()
    session = GDB.driver.session()
    #Query to find the count of transactions
    if (Node_Id == "All"):
        q1 = """
        MATCH (a:Address)-[t:Transaction]->(b:Address)
        RETURN t.from_address as from, t.to_address as to,
        LAST(COLLECT(t.hash)) as hash, COUNT(t) as count, COALESCE(SUM(TOFLOAT(t.value)), 0) as total

        """
        results = session.run(q1)
    else:
        q1 = """
        MATCH (a:Address)-[t:Transaction]->(b:Address)
        WHERE t.to_address = $Node_Id OR t.from_address = $Node_Id
        RETURN t.from_address as from, t.to_address as to,
        LAST(COLLECT(t.hash)) as hash, COUNT(t) as count, COALESCE(SUM(TOFLOAT(t.value)), 0) as total

        """
        parameters = {"Node_Id": Node_Id}
        results = session.run(q1, parameters=parameters)

    # Collect the results in a list of dictionaries
    #uniqueTransactions = [{"from": row["from"], "to": row["to"],"hash": row["hash"], "count": row["count"], "total": row["total"] } for row in results]
    uniqueTransactions = [{"from": row["from"], "to": row["to"], "hash": row["hash"], "count": row["count"], "total": row["total"]} for row in results]

    GDB.close()  # Close the driver when done

    return {"response": uniqueTransactions}

@router.get("/Transactions/{hash}")
async def Transactions(hash):
    GDB.connect()
    session = GDB.driver.session()
    #If the hash is not specified, retrieve all transactions
    if(hash == "All"):
        q1 = """
        MATCH (a:Address)-[t:Transaction]->(b:Address)
        RETURN t.hash AS hash, t.from_address AS from_address, t.to_address AS to_address,
        t.value AS value, t.input AS input, t.transaction_index AS transaction_index,
        t.gas AS gas, t.gas_used AS gas_used, t.gas_price AS gas_price,
        t.transaction_fee AS transaction_fee, t.block_number AS block_number,
        t.block_hash AS block_hash, t.block_timestamp AS block_timestamp;
        """
        results = session.run(q1)
    else:
    # If a specific hash is provided, retrieve related transactions
        q1 = """
        MATCH (a1:Address)-[t1:Transaction]->(b1:Address)
        WHERE t1.hash = $hash
        WITH t1
        MATCH (a:Address)-[t:Transaction]->(b:Address)
        WHERE t1.from_address = t.from_address AND t1.to_address = t.to_address
        RETURN t.hash AS hash, t.from_address AS from_address, t.to_address AS to_address,
            t.value AS value, t.input AS input, t.transaction_index AS transaction_index,
            t.gas AS gas, t.gas_used AS gas_used, t.gas_price AS gas_price,
            t.transaction_fee AS transaction_fee, t.block_number AS block_number,
            t.block_hash AS block_hash, t.block_timestamp AS block_timestamp
        ORDER BY t.block_timestamp DESC;
        """
        parameters = {"hash": hash}
        results = session.run(q1, parameters=parameters)

    # Collect the results in a list of dictionaries
    Transactions = [dict(row) for row in results]

    GDB.close()

    return {"response": Transactions}

@router.get("/EdgeTable/{hash}")
async def EdgeTable(hash):
    GDB.connect()
    session = GDB.driver.session()

    #Query to count transactions having the same 'to_address' and 'from_address'
    q1 = """
    MATCH (a1:Address)-[t1:Transaction]->(b1:Address)
    WHERE t1.hash = $hash
    WITH t1
    MATCH (a2:Address)-[t2:Transaction]->(b2:Address)
    WHERE t1.from_address = t2.from_address and t1.to_address = t2.to_address
    RETURN count(t2) as count

    """
    parameters = {"hash": hash}
    result1 = session.run(q1, parameters=parameters)

    #Query to calculate total value of transactions
    q2 = """
    MATCH (a1:Address)-[t1:Transaction]->(b1:Address)
    WHERE t1.hash = $hash
    WITH t1
    MATCH (a2:Address)-[t2:Transaction]->(b2:Address)
    WHERE t1.from_address = t2.from_address and t1.to_address = t2.to_address
    RETURN COALESCE(SUM(TOFLOAT(t2.value)),0) AS totalValue
    """
    parameters = {"hash": hash}
    result2 = session.run(q2, parameters=parameters)

    #Query to find the ealiest transaction
    q3 = """
    MATCH (a1:Address)-[t1:Transaction]->(b1:Address)
    WHERE t1.hash = $hash
    WITH t1
    MATCH (a2:Address)-[t2:Transaction]->(b2:Address)
    WHERE t1.from_address = t2.from_address and t1.to_address = t2.to_address
    RETURN t2.block_timestamp as earliest
    ORDER BY t2.block_timestamp ASC
    LIMIT 1
    """
    parameters = {"hash": hash}
    result3 = session.run(q3, parameters=parameters)

    #Query to find the latest transaction
    q4 = """
    MATCH (a1:Address)-[t1:Transaction]->(b1:Address)
    WHERE t1.hash = $hash
    WITH t1
    MATCH (a2:Address)-[t2:Transaction]->(b2:Address)
    WHERE t1.from_address = t2.from_address and t1.to_address = t2.to_address
    RETURN t2.block_timestamp as latest
    ORDER BY t2.block_timestamp DESC
    LIMIT 1
    """
    parameters = {"hash": hash}
    result4 = session.run(q4, parameters=parameters)

    # Collect the results in a list of dictionaries
    result1 = result1.single()
    result2 = result2.single()
    result3 = result3.single()
    result4 = result4.single()

    EdgeTable = {
        "totalValue": result2["totalValue"],
        "transactions": result1["count"],
        "ealiest": datetime.fromtimestamp(result3["earliest"]).strftime('%Y-%m-%d %H:%M:%S'),
        "latest": datetime.fromtimestamp(result4["latest"]).strftime('%Y-%m-%d %H:%M:%S'),
    }

    GDB.close()

    return {"response": EdgeTable}
