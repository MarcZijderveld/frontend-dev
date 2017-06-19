/**
 * Created by Arman Jalalian on 6/8/2017.
 */
import {Router} from 'backbone';

/**
 * Router for the pokemons URL's
 *
 * @constructor
 */
const LeagueOfLegendsRouter = Router.extend({
    routes: {
        'champion/:id': 'championAction'
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
    }
});

export default LeagueOfLegendsRouter;