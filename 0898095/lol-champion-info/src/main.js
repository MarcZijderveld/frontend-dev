import _ from 'underscore';
import {Events} from 'backbone';
import Champions from './collections/Champions';
import ChampionListView from './views/ChampionListView';
import ChampionDetails from './views/ChampionDetails';
import ChampionLinks from './views/ChampionLinks';

(function ()
{
    let setGlobalVariables = function ()
    {
        window.App = {};
        App.events = _.clone(Events);
    };

    /**
     * Run after dom is ready
     */
    let init = function ()
    {
        setGlobalVariables();
        let ChampionCollection = new Champions();
        new ChampionListView({el: "#champions", collection: ChampionCollection});
        let championCollection = new Champions;
        new ChampionDetails({el: "#champion", collection: championCollection});
        Backbone.history.start({pushState: true, root: "/0898095/lol-champion-info/"});
        App.events.trigger('loadChampions', { });       

        // console.log(window.location.href == location.protocol + '//' + location.host + '/0898095/lol-champion-info/');

        // if(window.location.href == location.protocol + '//' + location.host + '/0898095/lol-champion-info/')
        //     App.events.trigger('loadChampions', { });       
    };
    window.addEventListener('load', init);
})();
