"""
Simple queries file for manual SQL queries.
You can use an ORM once your project gets more complex.
"""

import sqlite3

def get_actors():
    with sqlite3.connect("sakila.db") as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM actor;")
        results = cursor.fetchall()
        print(results)
        return results

# TODO: Add more functions below.


if __name__ == "__main__":
    get_actors()