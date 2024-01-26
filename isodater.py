import pandas as pd
from datetime import datetime

# Load your CSV file
df = pd.read_csv('DogPlasma.csv')

# Define a function to convert dates to ISO format
def convert_to_iso(date_str):
    try:
        return datetime.strptime(date_str, '%m/%d/%Y').isoformat()
    except ValueError:  # Handle empty or invalid date strings
        return None

# Apply the conversion function to your date columns
df['expirationDate'] = df['expirationDate'].apply(convert_to_iso)
df['dateOrdered'] = df['dateOrdered'].apply(convert_to_iso)
df['dateReceived'] = df['dateReceived'].apply(convert_to_iso)

# Save the updated DataFrame to a new CSV file
df.to_csv('updated_file.csv')

print("Date conversion complete. Updated file saved as 'updated_file.csv'")
