var mya = angular.module('mya', [])
mya.controller('indexCtr', function($scope, $http) {

    $http({
        method: 'GET',
        url: '/quote',

    }).then(function(rsp) {
        $scope.quotes = rsp.data;
    },
        function(err) {
            console.log(err)
        })

    $scope.edit = function(quote) {
        $http({
            method: 'PUT',
            url: '/quote',
            data: quote

        }).then(function(rsp) {
            //quote  = rsp.data;
            alert('done')
        },
            function(err) {
                console.log(err)
            })
    }

    $scope.save = function() {
        $http({
            method: 'POST',
            url: '/quote',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                who: $scope.who,
                says: $scope.says
            }

        }).then(function(rsp) {
            $scope.who = ''
            $scope.says = ''
            $scope.quotes.push(rsp.data)
        },
            function(err) {
                console.log(err)
            })
    }


    $scope.remove = function(quote) {
        $http({
            method: 'DELETE',
            url: '/quote/' + quote._id,
            data: quote

        }).then(function(rsp) {
            $scope.quotes = $scope.quotes.filter(
                function(it) {
                    return it._id != quote._id;
                });
            alert('removed')
        },
            function(err) {
                console.log(err)
            })
    }
})