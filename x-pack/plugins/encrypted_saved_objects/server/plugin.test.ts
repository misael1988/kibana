/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { Plugin } from './plugin';
import { ConfigSchema } from './config';

import { coreMock } from 'src/core/server/mocks';
import { securityMock } from '../../security/server/mocks';

describe('EncryptedSavedObjects Plugin', () => {
  describe('setup()', () => {
    it('exposes proper contract', async () => {
      const plugin = new Plugin(
        coreMock.createPluginInitializerContext(ConfigSchema.validate({}, { dist: true }))
      );
      await expect(plugin.setup(coreMock.createSetup(), { security: securityMock.createSetup() }))
        .resolves.toMatchInlineSnapshot(`
              Object {
                "createMigration": [Function],
                "registerType": [Function],
                "usingEphemeralEncryptionKey": true,
              }
            `);
    });
  });

  describe('start()', () => {
    it('exposes proper contract', async () => {
      const plugin = new Plugin(
        coreMock.createPluginInitializerContext(ConfigSchema.validate({}, { dist: true }))
      );
      await plugin.setup(coreMock.createSetup(), { security: securityMock.createSetup() });

      const startContract = plugin.start();
      await expect(startContract).toMatchInlineSnapshot(`
              Object {
                "getClient": [Function],
                "isEncryptionError": [Function],
              }
            `);

      expect(startContract.getClient()).toMatchInlineSnapshot(`
              Object {
                "getDecryptedAsInternalUser": [Function],
              }
            `);
    });
  });
});
