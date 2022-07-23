`/etc/passwd` holds info about user accounts with passwords.
`/etc/shadow` holds the acutal hashed passwords for those accounts.

`/etc/passwd` format:

```
clint:x:1000:1000
---
username:has a password:user id:group id
```

We can figure out which group a user belongs to by grepping for the username in `/etc/passwd`: `$ grep clint /etc/passwd`.

This may result in `clint:x:1000:1000`.

The user `clint` belongs to a group with an id of `1000`.

We can figure out the group name by doing `$ grep 1000 /etc/group`.

Which may result in `clint:x:1000`, meaning user `clint` belongs to group `clint` with an id of `1000`.

Or you may get a result like `wheel:x:10:clint` which means `clint` belongs to `wheel` as a secondary group.

The user's primary group is defined in the group id of the user in `/etc/passwd` (`clint:x:1000:1000`).

Multiple secondary groups are separated by a comma (e.g.: `adm:x:4:sysadm,clint`).

The easier way to see groups is to type the `$ groups` command.

You can see which groups a user belongs to by providing the username: `$ groups clint`: `clint : clint wheel`

## Creating User Accounts

`$ useradd <username>`

You'll see the new user added to the end of the `/etc/passwd` file: `$ tail -5 /etc/passwd`.

Typically, this creates a new group of the same name, to which the new user belongs.
