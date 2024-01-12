from neo4j import GraphDatabase

# uri = "neo4j+s://3b01cb73.databases.neo4j.io"
# user = "neo4j"
# password = "4M9FFl1UnHdQojcX2raI5IHoW726JA_AXarDeL4hRkQ"

uri = "neo4j+s://3b01cb73.databases.neo4j.io"
user = "neo4j"
password = "4M9FFl1UnHdQojcX2raI5IHoW726JA_AXarDeL4hRkQ"

class Database:
    def __init__(self):
        self.driver = None

    def connect(self):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        if self.driver:
            self.driver.close()

GDB = Database()
