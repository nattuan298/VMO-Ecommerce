# VMO-Ecommerce
This is a back-end of personal small project for Ecommerce.
#
## Feature of APIs
### Requirements
- Users: CRUD, Verify email.
- Category: CRUD, Sort position of banner, view status.
- Items: CRUD, Check quantity when order created.
- Vouchers: CRUD, Check quantity when apply a voucher and delete an order.
- Flash Sale: CRUD, Manager number of items on sale, Manage time sale, Manage price of items on sale.
- Orders: CRD, Check flash sale, Apply voucher, Check inventory in stock.
- Send email to the users before the flash sale starts 15 minutes
### Other Requirements
-  Can not delete items when order created
-  Only admin can create categories and items
-  API list include Search, Sort, Filter, Pagination
-  Use Cronjob to send email notification
### Bonus APIs
- Reset password and Change password
#
## Installation
Install all package needed

```bash
npm install
```
#
## Usage
Run the project

```bash
npm start
```
#
## Test
Run test if it is available

```bash
npm test
```
