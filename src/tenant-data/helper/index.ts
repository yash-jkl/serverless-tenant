export const insertClientQuery = (data) => {
    const clientJSON = JSON.stringify(data);
    const dataObject = JSON.parse(clientJSON);
    return `INSERT INTO clients (id, name, timezone_id, currency_code, locale, business_summary, tagline, website, logo_url, phone_number, created_at, created_by, updated_at, updated_by, archived, archived_status_changed_at, active, active_status_changed_at, parent_id, address, long_term_goals) VALUES (${data.id ? `'${data.id}'` : null
        }, ${dataObject.name ? `'${dataObject.name}'` : null},${dataObject.timezone_id ? `'${dataObject.timezone_id}'` : null
        },${dataObject.currency_code ? `'${dataObject.currency_code}'` : null},${dataObject.locale ? `'${dataObject.locale}'` : null
        },${dataObject.business_summary ? `'${dataObject.business_summary}'` : null},${dataObject.tagline ? `'${dataObject.tagline}'` : null
        },${dataObject.website ? `'${dataObject.website}'` : null},${dataObject.logo_url ? `'${dataObject.logo_url}'` : null
        },${dataObject.phone_number ? `'${dataObject.phone_number}'` : null},${dataObject.created_at ? `'${dataObject.created_at}'` : null
        },${dataObject.created_by ? `'${dataObject.created_by}'` : null},${dataObject.updated_at ? `'${dataObject.updated_at}'` : null
        },${dataObject.updated_by ? `'${dataObject.updated_by}'` : null},${dataObject.archived
        },${dataObject.archived_status_changed_at
            ? `'${dataObject.archived_status_changed_at}'`
            : null
        },${dataObject.active},${dataObject.active_status_changed_at
            ? `'${dataObject.active_status_changed_at}'`
            : null
        },${dataObject.parent_id ? `'${dataObject.parent_id}'` : null
        },'${JSON.stringify(dataObject.address)}',${dataObject.long_term_goals ? `'${dataObject.long_term_goals}'` : null
        } );`;
}

export const updateClientQuery = (data) => {
    const clientJSON = JSON.stringify(data);
    const dataObject = JSON.parse(clientJSON);
    return `UPDATE clients
    SET
      name = ${dataObject.name ? `'${dataObject.name}'` : 'name'},
      timezone_id = ${dataObject.timezone_id ? `'${dataObject.timezone_id}'` : 'timezone_id'},
      currency_code = ${dataObject.currency_code ? `'${dataObject.currency_code}'` : 'currency_code'},
      locale = ${dataObject.locale ? `'${dataObject.locale}'` : 'locale'},
      business_summary = ${dataObject.business_summary ? `'${dataObject.business_summary}'` : 'business_summary'},
      tagline = ${dataObject.tagline ? `'${dataObject.tagline}'` : 'tagline'},
      website = ${dataObject.website ? `'${dataObject.website}'` : 'website'},
      logo_url = ${dataObject.logo_url ? `'${dataObject.logo_url}'` : 'logo_url'},
      phone_number = ${dataObject.phone_number ? `'${dataObject.phone_number}'` : 'phone_number'},
      created_at = ${dataObject.created_at ? `'${dataObject.created_at}'` : 'created_at'},
      created_by = ${dataObject.created_by ? `'${dataObject.created_by}'` : 'created_by'},
      updated_at = ${dataObject.updated_at ? `'${dataObject.updated_at}'` : 'updated_at'},
      updated_by = ${dataObject.updated_by ? `'${dataObject.updated_by}'` : 'updated_by'},
      archived = ${dataObject.archived ? true : false},
      archived_status_changed_at = ${dataObject.archived_status_changed_at ? `'${dataObject.archived_status_changed_at}'` : 'archived_status_changed_at'},
      active = ${dataObject.active ? true : false},
      active_status_changed_at = ${dataObject.active_status_changed_at ? `'${dataObject.active_status_changed_at}'` : 'active_status_changed_at'},
      parent_id = ${dataObject.parent_id ? `'${dataObject.parent_id}'` : 'parent_id'},
      address = '${JSON.stringify(dataObject.address)}',
      long_term_goals = ${dataObject.long_term_goals ? `'${dataObject.long_term_goals}'` : 'long_term_goals'}
    WHERE
      id = '${data.id}';
    `
}
export const getClientQuery = (data) => {
    return `SELECT * from clients where id ='${data.id}';`
}
