import {Collection} from 'backbone';
import Rune from '../models/Rune';

/**
 * Collection for the LoL Runes endpoint
 *
 * @constructor
 */
const Runes = Collection.extend({
    model: Rune,
    id: '',
    url: function() { return 'https://stud.cmi.hr.nl/0898095/riot/api/riotapi.php?runes=true'; }
});

export default Runes;
