import _ from 'lodash';
import moment from 'moment';

const router = require('express').Router();

router.get('/test', (req, res) => {
  res.send('okk')
})

module.exports = router;
