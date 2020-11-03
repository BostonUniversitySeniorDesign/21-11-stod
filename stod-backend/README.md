User Table:
    - Id: uuid string
    - username: string
    - Email: string
    - Password: saled hash string (Handled by django)

Posts:
    - id: some uuid string (PRIMARY KEY)
    - group: string
    - contents: string
    - poster: string (foreign key.. should be in user database)