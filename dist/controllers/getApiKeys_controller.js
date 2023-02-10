"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiKeys = void 0;
const getApiKeys = (req, res) => {
    const key = process.env.TINYMCE_API_KEY;
    res.json({ key });
};
exports.getApiKeys = getApiKeys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QXBpS2V5c19jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vY29udHJvbGxlcnMvZ2V0QXBpS2V5c19jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVPLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQ3hELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO0lBQ3hDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUhXLFFBQUEsVUFBVSxjQUdyQiJ9