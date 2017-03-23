class UserDetailsController  {

  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor($mdBottomSheet, $log) {
    this.$mdBottomSheet = $mdBottomSheet;
    this.$log = $log;
    this.path = 'm';
    this.subpaths = ['m/0', 'm/1', 'm/0\'', 'm/1\''];
  }

  /**
   * Show the bottom sheet
   */
  showPanel(mode, path) {
    var user = this.selected;
    var $mdBottomSheet = this.$mdBottomSheet;

    $mdBottomSheet.show({
      parent: angular.element(document. getElementById('content')),
      templateUrl: 'src/users/components/details/ContactSheet.html',
      controller: [ '$mdBottomSheet', UserSheetController],
      controllerAs: "$ctrl",
      bindToController : true
    });

    /**
     * Bottom Sheet controller for the Avatar Actions
     */
    function UserSheetController( $mdBottomSheet ) {

      let bitcore = require('bitcore-lib');
      let mnemonic = require('bitcore-mnemonic');
      let message = require('bitcore-message');

      this.user = user;
      this.path = path;
      this.mode = mode;

      this.derivePub = (path) => {
        return bitcore.HDPublicKey(this.user.xpubkey).derive(path);
      };

      this.derivePriv = (path) => {
        return mnemonic(this.user.seed).toHDPrivateKey().derive(path);
      };

      this.sign = () => {
        this.signature = message(this.message).sign(this.derivePriv(this.path).privateKey);
      }

      this.verify = () => {
        let address = bitcore.Address(this.derivePub(this.path).publicKey);
        this.valid = message(this.message).verify(address, this.signature)? "Correct signature": "Incorrect signature";
      }

      this.copy = (title, text) => {
        prompt(title+":", text);
      };
    }
  }

  expand(path) {
    if (!path) {
      this.path = this.path.split('/').slice(0,-1).join('/');
    } else {
      this.path = path;
    }
    this.subpaths = [
      this.path+'/0',
      this.path+'/1',
      this.path+'/0\'',
      this.path+'/1\''
    ];
  }

  copy(title, text) {
    prompt(title+":", text);
  }

}
export default UserDetailsController;
