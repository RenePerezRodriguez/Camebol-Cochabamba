export function downloadCSV(data: any[], filename: string) {
    if (!data || data.length === 0) return;

    // Get headers
    const headers = Object.keys(data[0]);

    // Create CSV content with BOM for Excel UTF-8 compatibility
    const BOM = "\uFEFF";
    const separator = ";"; // Common in Spanish regions

    const csvContent = BOM + [
        headers.join(separator), // Header row
        ...data.map(row =>
            headers.map(fieldName => {
                const value = row[fieldName];
                // Handle strings with separators or quotes
                if (typeof value === 'string') {
                    // Escape quotes and wrap in quotes
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value === null || value === undefined ? "" : value;
            }).join(separator)
        )
    ].join('\n');

    // Create blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
