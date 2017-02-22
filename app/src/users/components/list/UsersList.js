import UserListController from './UserListController'

export default {
  name : 'usersList',
  config : {
    bindings         : {  users: '<', selected : '<', showDetails : '&onSelected' },
    templateUrl      : 'src/users/components/list/UsersList.html',
    controller       : [UserListController]
  }
};
