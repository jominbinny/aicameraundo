globalThis.__nitro_main__ = import.meta.url;
import { N as NodeResponse, s as serve } from "./_libs/srvx.mjs";
import { d as defineHandler, H as HTTPError, t as toEventHandler, a as defineLazyEventHandler, b as H3Core } from "./_libs/h3.mjs";
import { d as decodePath, w as withLeadingSlash, a as withoutTrailingSlash, j as joinURL } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./_libs/rou3.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const headers = ((m) => function headersRouteRule(event) {
  for (const [key2, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key2, value);
  }
});
const assets = {
  "/manifest.webmanifest": {
    "type": "application/manifest+json",
    "etag": '"1f0-ZUkzKobn/VDcB4eai/UmuBxpIgs"',
    "mtime": "2026-06-08T18:10:48.797Z",
    "size": 496,
    "path": "../public/manifest.webmanifest"
  },
  "/assets/LeafletMap-9Hbp8J6b.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"4365-juG4/SefA3+vOSsPdMTRhdkCzUU"',
    "mtime": "2026-06-08T18:10:47.307Z",
    "size": 17253,
    "path": "../public/assets/LeafletMap-9Hbp8J6b.css"
  },
  "/assets/LeafletMap-C8ZwlNp4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ec80-XKK12YP5zHtVTdyQyJdGyd3OIfI"',
    "mtime": "2026-06-08T18:10:47.343Z",
    "size": 191616,
    "path": "../public/assets/LeafletMap-C8ZwlNp4.js"
  },
  "/assets/MapView-aUJ6ud1o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"344-4BzS3XVDhPvEaPDp1lz0fdUc/jU"',
    "mtime": "2026-06-08T18:10:47.314Z",
    "size": 836,
    "path": "../public/assets/MapView-aUJ6ud1o.js"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": '"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4"',
    "mtime": "2026-06-08T18:10:48.798Z",
    "size": 23,
    "path": "../public/robots.txt"
  },
  "/assets/PageHeader-CkQGnbDM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"318-u7yekaVXKHOxw8h1Sfse6MsKYJI"',
    "mtime": "2026-06-08T18:10:47.321Z",
    "size": 792,
    "path": "../public/assets/PageHeader-CkQGnbDM.js"
  },
  "/assets/CameraCard-4Mv22bn7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"97f-RIJJdFMxfO1AE6smJuR35oghckg"',
    "mtime": "2026-06-08T18:10:47.312Z",
    "size": 2431,
    "path": "../public/assets/CameraCard-4Mv22bn7.js"
  },
  "/assets/camera-DZJ5pdKo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"151-HhQ34rchYVaZcfBLP03oG72qfio"',
    "mtime": "2026-06-08T18:10:47.318Z",
    "size": 337,
    "path": "../public/assets/camera-DZJ5pdKo.js"
  },
  "/assets/cameraService-CFn0KIri.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ae24-Y+Wb53RY1yJLLsTRF/a4r0IuMpU"',
    "mtime": "2026-06-08T18:10:47.331Z",
    "size": 110116,
    "path": "../public/assets/cameraService-CFn0KIri.js"
  },
  "/assets/fine-calculator-B4yNgQJf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8342-GRhH/JOqD6PYs7LCH307yxwqnTI"',
    "mtime": "2026-06-08T18:10:47.323Z",
    "size": 33602,
    "path": "../public/assets/fine-calculator-B4yNgQJf.js"
  },
  "/assets/index-CPg2rVZl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"59e81-+LqRpkI78vlgyryTTOnWPGlBPzI"',
    "mtime": "2026-06-08T18:10:47.289Z",
    "size": 368257,
    "path": "../public/assets/index-CPg2rVZl.js"
  },
  "/assets/logo-D3lXJFCB.png": {
    "type": "image/png",
    "etag": '"d571-2hOxgSeHswjxwTZkS2LfgsGddog"',
    "mtime": "2026-06-08T18:10:47.319Z",
    "size": 54641,
    "path": "../public/assets/logo-D3lXJFCB.png"
  },
  "/assets/index-CsLSYaH9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a13-L9P6rBGLapzqcWxOv7VN/VKwh34"',
    "mtime": "2026-06-08T18:10:47.321Z",
    "size": 2579,
    "path": "../public/assets/index-CsLSYaH9.js"
  },
  "/assets/map-eFSu1Rw8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d33-oCjepyS6ckgzm4dmFt86R8Yubzo"',
    "mtime": "2026-06-08T18:10:47.316Z",
    "size": 3379,
    "path": "../public/assets/map-eFSu1Rw8.js"
  },
  "/assets/near-me-CjOsrnoF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa0-hZe2ttR3ai7aVo8MGmZjeoew8as"',
    "mtime": "2026-06-08T18:10:47.312Z",
    "size": 2720,
    "path": "../public/assets/near-me-CjOsrnoF.js"
  },
  "/assets/route-checker-DvxTx5Cl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1a89-6l28FF12sJAbsdMzJdCw8Em36qQ"',
    "mtime": "2026-06-08T18:10:47.309Z",
    "size": 6793,
    "path": "../public/assets/route-checker-DvxTx5Cl.js"
  },
  "/assets/styles-CyKPsbUg.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1352f-bFJmq3PVHg+t5bMpd02ud9Worqg"',
    "mtime": "2026-06-08T18:10:47.324Z",
    "size": 79151,
    "path": "../public/assets/styles-CyKPsbUg.css"
  },
  "/assets/useGeolocation-BsxuaALR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"221-pkNIxAnsqzUpMms0aBMQrSsfCrY"',
    "mtime": "2026-06-08T18:10:47.316Z",
    "size": 545,
    "path": "../public/assets/useGeolocation-BsxuaALR.js"
  },
  "/icons/icon-192.png": {
    "type": "image/png",
    "etag": '"2f68-15UEpzgWfVfptx3Njshx0wvgURE"',
    "mtime": "2026-06-08T18:10:48.798Z",
    "size": 12136,
    "path": "../public/icons/icon-192.png"
  },
  "/icons/icon-512.png": {
    "type": "image/png",
    "etag": '"d571-2hOxgSeHswjxwTZkS2LfgsGddog"',
    "mtime": "2026-06-08T18:10:48.799Z",
    "size": 54641,
    "path": "../public/icons/icon-512.png"
  },
  "/assets/LanguageToggle-DGmVcNG5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ed-ndk6DqWb+KjdnJFQCSphWapkbJk"',
    "mtime": "2026-06-08T18:10:47.323Z",
    "size": 749,
    "path": "../public/assets/LanguageToggle-DGmVcNG5.js"
  }
};
function readAsset(id) {
  const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
  return promises.readFile(resolve(serverDir, assets[id].path));
}
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
function getAsset(id) {
  return assets[id];
}
const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = {
  gzip: ".gz",
  br: ".br",
  zstd: ".zst"
};
const _RF_GZ7 = defineHandler((event) => {
  if (event.req.method && !METHODS.has(event.req.method)) {
    return;
  }
  let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
  let asset;
  const encodingHeader = event.req.headers.get("accept-encoding") || "";
  const encodings = [...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.res.headers.delete("Cache-Control");
      throw new HTTPError({ status: 404 });
    }
    return;
  }
  if (encodings.length > 1) {
    event.res.headers.append("Vary", "Accept-Encoding");
  }
  const ifNotMatch = event.req.headers.get("if-none-match") === asset.etag;
  if (ifNotMatch) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  const ifModifiedSinceH = event.req.headers.get("if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.res.status = 304;
    event.res.statusText = "Not Modified";
    return "";
  }
  if (asset.type) {
    event.res.headers.set("Content-Type", asset.type);
  }
  if (asset.etag && !event.res.headers.has("ETag")) {
    event.res.headers.set("ETag", asset.etag);
  }
  if (asset.mtime && !event.res.headers.has("Last-Modified")) {
    event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.res.headers.has("Content-Encoding")) {
    event.res.headers.set("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.res.headers.has("Content-Length")) {
    event.res.headers.set("Content-Length", asset.size.toString());
  }
  return readAsset(id);
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_wTgr_r = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_wTgr_r };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_RF_GZ7)
].filter(Boolean);
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    middleware.push(...h3App["~middleware"]);
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
  process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
  process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
const tracingSrvxPlugins = [];
const _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
const port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
const host = process.env.NITRO_HOST || process.env.HOST;
const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
serve({
  port,
  hostname: host,
  tls: cert && key ? {
    cert,
    key
  } : void 0,
  fetch: nitroApp.fetch,
  plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
const nodeServer = {};
export {
  nodeServer as default
};
