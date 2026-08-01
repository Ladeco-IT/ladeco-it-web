# Ladeco IT Web

Publieke website met pricing simulator, pc-builder en contactflow.

## Starten

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## PC-catalogus sync met admin-web

Je kan de pc-builder automatisch laten syncen met de beheerpagina in `admin-web`.

Stel op deze app de volgende env vars in:

```bash
PC_CATALOG_SYNC_URL=https://jouwdomein-admin.be/api/pc-catalog
PC_CATALOG_SYNC_TOKEN=zelfde-token-als-op-admin-server
```

Werking:

1. `app/api/pc-builder-prices` haalt live prijzen op.
2. Als `PC_CATALOG_SYNC_URL` is ingesteld, haalt de route ook componenten/upgrades op uit admin-web.
3. De builder toont dan automatisch de gesynchroniseerde catalogusdata (incl. foto-links en Intel/AMD compatibiliteit).
