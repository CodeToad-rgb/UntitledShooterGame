const skullB64 = `data:image/png;base64,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`;
