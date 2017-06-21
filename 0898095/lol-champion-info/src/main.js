import _ from 'underscore';
import {Events} from 'backbone';
import Champions from './collections/Champions';
import Runes from './collections/Runes';
import ChampionListView from './views/ChampionListView';
import RuneListView from './views/RuneListView';
import ChampionDetails from './views/ChampionDetails';
import ChampionLinks from './views/ChampionLinks';
import HeaderLinks from './views/HeaderLinks';

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
        let RunesCollection = new Runes();
        new RuneListView({el: "#runes", collection: RunesCollection});
        let championCollection = new Champions;
        new ChampionDetails({el: "#champion", collection: championCollection});
        new HeaderLinks({el: "#header-links"});
        Backbone.history.start({pushState: true, root: "/0898095/lol-champion-info/"});
        App.events.trigger('loadChampions', { });       
    };
    window.addEventListener('load', init);

})();
