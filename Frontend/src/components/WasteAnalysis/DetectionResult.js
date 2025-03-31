import React from "react";

const DetectionResult = ({ result, imageUrl }) => {
    // Function to parse the result text into an array of objects
    const parseResult = (resultText) => {
        if (!resultText || typeof resultText !== "string") return [];

        return resultText.split("\n").map((line) => {
            const parts = line.split(" - ");
            if (parts.length === 3) {
                return {
                    name: parts[0],
                    count: parseInt(parts[1], 10),
                    weight: parseFloat(parts[2]),
                };
            }
            return null;
        }).filter(Boolean);
    };

    const formattedResult = parseResult(result);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            {/* ✅ Display the uploaded image */}
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="Uploaded"
                    className="w-64 h-64 object-cover rounded-lg mb-4 border border-gray-300 shadow-md"
                />
            )}

            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Detection Result (Damaged Fruits)
            </h3>

            {/* ✅ Render detection results */}
            {formattedResult.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300 shadow-sm">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-400 px-4 py-2 text-gray-700">
                                Fruit
                            </th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-700">
                                Count
                            </th>
                            <th className="border border-gray-400 px-4 py-2 text-gray-700">
                                Total Weight (kg)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {formattedResult.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.name}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.count}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {item.weight.toFixed(2)} kg
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500 text-sm mt-2">
                    No damaged fruits detected.
                </p>
            )}
        </div>
    );
};

export default DetectionResult;
