# HM2

# Make an expense tracker app, which is connected to a firebase Firestore database. 
# User can add, edit, delete expenses which is updated to database

Screens:
There are 4 screens (These are still components that render other components) in this app which user can navigate to them using a nested navigation

All Expenses
Important Expenses
The first two screens are shown in a bottom tab navigator and both show a list of expense items. To implement the list of expense items, use a scrollable component that has a better performance for showing a list of dynamic data. Create a component (e.g. ExpenseList) and 
reuse this in All Expenses and Important Expenses screen. You should pass a prop to communicate what expenses (all or important expenses) to query from firebase.

![0d0a527c235cffdeaedf207386f63f2](https://user-images.githubusercontent.com/78027883/198927089-d8fdba02-067d-4bef-94a0-de6384767e1d.png)
![947e74a39c6347eb08d8c7b9ce33093](https://user-images.githubusercontent.com/78027883/198927105-330adbf8-27fa-485b-8e0c-99a0a5d5a808.png)

Edit Expense
 Tapping each expense item in the list (on both all and important expenses screens) navigate to Edit Expense screen. This screens show two buttons to the user, 
 to delete an expense item, or mark it as important. An alert should be shown to the user to confirm the action. These actions update Firestore database accordingly.
 
 ![2d518916747fcdf6c3e2fb2a2453353](https://user-images.githubusercontent.com/78027883/198927190-6f5ea294-e3c4-4ae3-83b6-24a660f36627.png)
![4e439c5708012aa9b29686e948ff9a8](https://user-images.githubusercontent.com/78027883/198927210-9ec90bc4-33d9-4040-87f0-bd4b4c215793.png)

Add Expense
From both All Expenses and Important Expenses screens, you can navigate to Add Expenses screen by pressing on a header button. Add Expense screen shows a form to the user to add an expense item with amount and description values. You should validate user's entry (e.g. no negative number, or letters for amount, no empty submission,...). This action adds a new item to Firestore database, 
and assigns it a unique id. You need to get this id when reading the data and save it in your expenses data so you could identify expense items.

![78061a0039a1cf61fd916dc26210080](https://user-images.githubusercontent.com/78027883/198927296-aa74e059-76c7-4864-95c7-f68e7c9da171.png)
![60ae81660397cc706e3d4dac763c03b](https://user-images.githubusercontent.com/78027883/198927312-cc3e97f0-c8e1-4273-a665-a416e52b684c.png)


