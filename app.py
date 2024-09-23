from datetime import datetime
import requests, os
from dotenv import load_dotenv

load_dotenv()

tradier_api_key = os.getenv('TRADIER_API_KEY')
sandbox_api_key = os.getenv('SANDBOX_API_KEY')

num_accounts = 0
accounts = []
accounts_sorted = []

# Initialize profile info
response = requests.get('https://api.tradier.com/v1/user/profile',
    params={},
    headers={'Authorization': f'Bearer {tradier_api_key}', 'Accept': 'application/json'}
)
json_response = response.json()
# store account ids
for account in json_response['profile']['account']:
    accounts.append(account['account_number'])
# save number of accounts
num_accounts = len(accounts)

bars = '-'*25
print(bars)
print(f"You have {num_accounts} accounts.")
print(f"Accounts: {accounts}")
print(bars)

# Profile
def get_profile():
    response = requests.get('https://api.tradier.com/v1/user/profile',
        params={},
        headers={'Authorization': f'Bearer {tradier_api_key}', 'Accept': 'application/json'}
    )
    json_response = response.json()
    # print(response.status_code)
    # print(json_response['profile']['account'])
    total_accounts = len(json_response['profile']['account'])
    print(f'You have {total_accounts} accounts.')
    # account_id = json_response['profile']['account']['account_number']
    return

# Balance
# TODO - get balance for all accounts (show just one big total)
def get_balance():
    total_market_value = 0
    total_stock_long_value = 0
    total_cash = 0
    total_cash_available = 0
    counter = 0
    for account_id in accounts:
        response = requests.get(f'https://api.tradier.com/v1/accounts/{account_id}/balances',
            params={},
            headers={'Authorization': f'Bearer {tradier_api_key}', 'Accept': 'application/json'}
        )
        # print(response.status_code)
        json_response = response.json()
        # print(json_response)
        total_market_value += json_response['balances']['market_value']
        total_stock_long_value += json_response['balances']['stock_long_value']
        total_cash += json_response['balances']['total_cash']
        total_cash_available += json_response['balances']['cash']['cash_available']
    print(
    f"""
    {bars}
    Market Value: {total_market_value}
    Stock Long Value: {total_stock_long_value}
    Total Cash: {total_cash}
    Cash Available: {total_cash_available}
    {bars}"""
    )
    return

# Buying orders
# ask user for the symbol (one time) and account index (starting from 0 or other)
# display market data for the symbol (one time)
# prompt user to confirm symbol
# go through each account
# fixed parameters for all orders
# place an equity order
# if status is good, go to next account and place order
# if status is bad, save account index, display eror, and try again? (maybe print index and prompt user to try again starting at such index)
def lookup_symbol(symbol: str):
    response = requests.get('https://api.tradier.com/v1/markets/lookup',
        params={'q': f'{symbol}', 'types': 'stock'},
        headers={'Authorization': f'Bearer {tradier_api_key}', 'Accept': 'application/json'}
    )
    json_response = response.json()
    print(response.status_code)
    print(json_response)
    return

def buy_order(symbol: str):
    lookup_symbol(symbol)
    confirm = input('Do you want to buy this stock? (y/n): ')
    if confirm.lower() not in ['y', 'yes']:
        print('Exiting...')
        return
    counter = 0
    error_accounts = []
    for account_id in accounts:
        counter += 1
        response = requests.post(f'https://api.tradier.com/v1/accounts/{account_id}/orders',
            data={'class': 'equity', 'symbol': f'{symbol}', 'side': 'buy', 'quantity': '1', 'type': 'market', 'duration': 'day'},
            headers={'Authorization': f'Bearer {tradier_api_key}', 'Accept': 'application/json'}
        )
        json_response = response.json()
        # print(response.status_code)
        # print(json_response)
        if response.status_code == 200:
            if 'errors' in json_response:
                print(f"{counter}: Error: {json_response['errors']['error']}")
                error_accounts.append(account_id)
            else:
                print(f'{counter}: Buy order for {symbol} has been placed on account {account_id}.')
        else:
            print(f'{counter}: Error placing buy order on account {account_id}. Status code: {response.status_code}')
            error_accounts.append(account_id)
    if error_accounts:
        print(f"Error accounts for buying: {error_accounts}")
    return

# Selling orders
def sell_order(symbol: str):
    lookup_symbol(symbol)
    confirm = input('Do you want to sell this stock? (y/n): ')
    if confirm.lower() not in ['y', 'yes']:
        print('Exiting...')
        return
    counter = 0
    error_accounts = []
    for account_id in accounts:
        counter += 1
        response = requests.post(f'https://api.tradier.com/v1/accounts/{account_id}/orders',
            data={'class': 'equity', 'symbol': f'{symbol}', 'side': 'sell', 'quantity': '1', 'type': 'market', 'duration': 'day'},
            headers={'Authorization': f'Bearer {tradier_api_key}', 'Accept': 'application/json'}
        )
        json_response = response.json()
        # print(response.status_code)
        # print(json_response)
        if response.status_code == 200:
            if 'errors' in json_response:
                print(f"{counter} Error: {json_response['errors']['error']}")
                error_accounts.append(account_id)
            else:
                print(f'{counter}: Sell order for {symbol} has been placed on account {account_id}.')
        else:
            print(f'{counter}: Error placing sell order on account {account_id}. Status code: {response.status_code}')
            error_accounts.append(account_id)
    if error_accounts:
        print(f"Error accounts for selling: {error_accounts}")
    return


if __name__ == '__main__':
    exit_app = False
    while not exit_app:
        print("-"*20)
        print('1. Get Profile')
        print('2. Get Balance')
        print('3. Buy Order')
        print('4. Sell Order')
        print('5. Exit')
        choice = input('Enter your choice: ')
        match choice:
            case '1':
                get_profile()
            case '2':
                get_balance()
            case '3':
                symbol = input('Enter the symbol: ')
                buy_order(symbol)
            case '4':
                symbol = input('Enter the symbol: ')
                sell_order(symbol)
            case '5':
                exit_app = True
            case _:
                print('Invalid choice. Try again.')