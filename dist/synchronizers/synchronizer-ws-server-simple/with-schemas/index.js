const EMPTY_STRING = '';
const UTF8 = 'utf8';
const MESSAGE = 'message';
const strMatch = (str, regex) => str?.match(regex);

const getIfNotFunction = (predicate) => (value, then, otherwise) =>
  predicate(value)
    ? /* istanbul ignore next */
      otherwise?.()
    : then(value);
const isUndefined = (thing) => thing === void 0;
const ifNotUndefined = getIfNotFunction(isUndefined);
const slice = (arrayOrString, start, end) => arrayOrString.slice(start, end);

const collSize = (coll) => coll?.size ?? 0;
const collHas = (coll, keyOrValue) => coll?.has(keyOrValue) ?? false;
const collIsEmpty = (coll) => isUndefined(coll) || collSize(coll) == 0;
const collClear = (coll) => coll.clear();
const collForEach = (coll, cb) => coll?.forEach(cb);
const collDel = (coll, keyOrValue) => coll?.delete(keyOrValue);

const object = Object;
const objFreeze = object.freeze;

const map = Map;
const mapNew = (entries) => new map(entries);
const mapGet = (map2, key) => map2?.get(key);
const mapForEach = (map2, cb) =>
  collForEach(map2, (value, key) => cb(key, value));
const mapSet = (map2, key, value) =>
  isUndefined(value) ? (collDel(map2, key), map2) : map2?.set(key, value);
const mapEnsure = (map2, key, getDefaultValue, hadExistingValue) => {
  if (!collHas(map2, key)) {
    mapSet(map2, key, getDefaultValue());
  }
  return mapGet(map2, key);
};

const MESSAGE_SEPARATOR = '\n';
const ifPayloadValid = (payload, then) => {
  const splitAt = payload.indexOf(MESSAGE_SEPARATOR);
  if (splitAt !== -1) {
    then(slice(payload, 0, splitAt), slice(payload, splitAt + 1));
  }
};
const createRawPayload = (clientId, remainder) =>
  clientId + MESSAGE_SEPARATOR + remainder;

const PATH_REGEX = /\/([^?]*)/;
const createWsServerSimple = (webSocketServer) => {
  const clientsByPath = mapNew();
  webSocketServer.on('connection', (client, request) =>
    ifNotUndefined(strMatch(request.url, PATH_REGEX), ([, pathId]) =>
      ifNotUndefined(request.headers['sec-websocket-key'], async (clientId) => {
        const clients = mapEnsure(clientsByPath, pathId, mapNew);
        mapSet(clients, clientId, client);
        client.on(MESSAGE, (data) =>
          ifPayloadValid(data.toString(UTF8), (toClientId, remainder) => {
            const forwardedPayload = createRawPayload(clientId, remainder);
            if (toClientId === EMPTY_STRING) {
              mapForEach(clients, (otherClientId, otherClient) =>
                otherClientId !== clientId
                  ? otherClient.send(forwardedPayload)
                  : 0,
              );
            } else {
              mapGet(clients, toClientId)?.send(forwardedPayload);
            }
          }),
        );
        client.on('close', () => {
          collDel(clients, clientId);
          if (collIsEmpty(clients)) {
            collDel(clientsByPath, pathId);
          }
        });
      }),
    ),
  );
  const getWebSocketServer = () => webSocketServer;
  const destroy = async () => {
    collClear(clientsByPath);
    webSocketServer.close();
  };
  const wsServerSimple = {
    getWebSocketServer,
    destroy,
  };
  return objFreeze(wsServerSimple);
};

export {createWsServerSimple};
