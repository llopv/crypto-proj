class UserListController{

  constructor() {
    this.identities = this.users.filter(user => user.type === 'identity');
    this.contacts = this.users.filter(user => user.type === 'contact');
  }
}
export default UserListController;
