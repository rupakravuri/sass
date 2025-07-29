export default class BaseController {
  ok(res, data)     { return res.json({ success: true, data }); }
  created(res, d)   { return res.status(201).json({ success: true, data: d }); }
}