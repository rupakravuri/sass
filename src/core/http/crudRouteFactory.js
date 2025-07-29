export function crudRoutes({ router, controller, auth, validate, schemas }) {
  router.get('/', auth(), controller.index);
  router.get('/:id', auth(), controller.show);
  router.post('/', auth('manage'), validate(schemas.create), controller.create);
  router.put('/:id', auth('manage'), validate(schemas.update), controller.update);
  router.delete('/:id', auth('manage'), controller.remove);
  return router;
}