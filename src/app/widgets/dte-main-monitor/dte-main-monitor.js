
(function(){

  'use strict';

  angular

    .module('rfc')

    .component('dteMainMonitor', {

        bindings : {
          name : '@',
          enviroment : '=enviroment'
        },

        restrict : 'E',
        templateUrl : 'app/widgets/dte-main-monitor/dte-main-monitor.html',
        controller : dteMainMonitor
    } )

  dteMainMonitor.$inject = ['dteResolve', '$uibModal']  ;

  function dteMainMonitor (dteResolve, $uibModal ) {

    var vm = this ;

    vm.add = add;
    vm.save = save;
    vm.update = update ;
    vm.remove = remove ;

    function update ( item ) {
      console.log( ':: Updating ' + item.name )
      // dteResolve.upadate[vm.name]()
    }

    function remove ( item ) {
      console.log( ':: Removing ' + item.name )
      // dteResolve.delete[vm.name]()
    }

    function save () {
      console.log( ':: Saving ' + vm.name ) ;
      // dteResolve.save[vm.name]()
    }

    function add() {
      $uibModal.open( {
        animation: true,
        component: 'dteModal',
        resolve: {
            data : function() {
              return dteResolve
                        .get('server/list-enviroments.json')
                        .then(function(data){
                          return {
                            method : 'insert',
                            enviroment : vm.enviroment,
                            name : vm.name,
                            nameForm : vm.name+'Form',
                            checkListTableRows : data
                          }
                        })
            }
        },
        controller: function($scope) {
          $scope.title = vm.name;
        }
      } )
      .result.then( function ( data ){
        console.log( 'ok', data )
      }, function ( message ) {
        console.log('dismiss', message )
      }  )
    }

    return function(){

          dteResolve
              .get('server/' + vm.name + '.json' )
              .then(function(data){
                vm.rows = data ;
              }) ;

    }()

  }

})() ;