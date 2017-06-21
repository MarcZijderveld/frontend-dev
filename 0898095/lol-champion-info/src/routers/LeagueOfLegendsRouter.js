/**
 * Created by Arman Jalalian on 6/8/2017.
 */
import {Router} from 'backbone';

/**
 * Router for the Champion URL's
 *
 * @constructor
 */
const LeagueOfLegendsRouter = Router.extend({
    routes: {
        'champion/:id': 'championAction',
        'champions' : 'championsAction',
        'runes' : 'runesAction'
    },

    /**
     * Route callback, used to trigger global event
     *
     * @param championId
     */
    championAction: function (id) {
        App.events.trigger('newChampion', {
            id: id
        });
    },
    championsAction: function (id) {
        App.events.trigger('loadChampions', { });
    },
    runesAction: function (id) {
        App.events.trigger('loadRunes', { });
    }
});

export default LeagueOfLegendsRouter;