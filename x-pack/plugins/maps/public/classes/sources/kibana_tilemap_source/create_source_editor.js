/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { EuiFieldText, EuiFormRow, EuiPanel } from '@elastic/eui';

import { getKibanaTileMap } from '../../../meta';
import { i18n } from '@kbn/i18n';

export function CreateSourceEditor({ onSourceConfigChange }) {
  const tilemap = getKibanaTileMap();
  useEffect(() => {
    if (tilemap.url) {
      onSourceConfigChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EuiPanel>
      <EuiFormRow
        label={i18n.translate('xpack.maps.source.kbnTMS.kbnTMS.urlLabel', {
          defaultMessage: 'Tilemap url',
        })}
        helpText={
          tilemap.url
            ? null
            : i18n.translate('xpack.maps.source.kbnTMS.noLayerAvailableHelptext', {
                defaultMessage:
                  'No tilemap layer is available. Ask your system administrator to set "map.tilemap.url" in kibana.yml.',
              })
        }
      >
        <EuiFieldText readOnly value={tilemap.url ? tilemap.url : ''} />
      </EuiFormRow>
    </EuiPanel>
  );
}

CreateSourceEditor.propTypes = {
  onSourceConfigChange: PropTypes.func.isRequired,
};
