from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import string, random
from fastapi import Request
app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:8080"], 
    allow_origins=["https://demo-2-2ig4.onrender.com"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Store short links in memory
url_store = {}

class URLRequest(BaseModel):
    url: HttpUrl

def generate_short_code(length=6):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

# @app.post("/shorten")
# def shorten_url(request: URLRequest):
#     code = generate_short_code()
#     url_store[code] = str(request.url)
#     return {"short_url": f"http://localhost:8000/{code}"}

# @app.post("/shorten")
# def shorten_url(request: Request, data: URLRequest):
#     code = generate_short_code()
#     url_store[code] = str(data.url)
#     base_url = str(request.base_url)  # automatically gets your deployed URL
#     return {"short_url": f"{base_url}{code}"}

@app.post("/shorten")
def shorten_url(data: URLRequest):
    code = generate_short_code()
    url_store[code] = str(data.url)
    # Only return the shortened part
    return {"short_code": code, "short_path": f"/{code}"}

    

@app.get("/{code}")
def redirect_url(code: str):
    if code in url_store:
        return RedirectResponse(url=url_store[code])
    raise HTTPException(status_code=404, detail="URL not found")
