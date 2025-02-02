from django.core.files.storage import Storage
from django.utils.deconstruct import deconstructible
from supabase import create_client
import mimetypes
from dotenv import load_dotenv
import os
from urllib.parse import urljoin
from io import BytesIO

# Load environment variables
load_dotenv()

# Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials! Check your .env file.")

# Initialize Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

@deconstructible
class SupabaseStorage(Storage):
    """Custom storage backend for Supabase Storage."""

    def __init__(self, bucket_name="media"):
        self.bucket_name = bucket_name

    def _save(self, name, content):
        """Uploads file to Supabase Storage."""
        try:
            # Convert Windows backslashes (\) to forward slashes (/)
            name = name.replace("\\", "/")

            # Ensure file is read in bytes
            content.seek(0)
            file_data = content.read()

            # Determine MIME type
            mime_type, _ = mimetypes.guess_type(name)
            file_options = {"content-type": mime_type or "application/octet-stream"}

            # Upload file to Supabase
            response = supabase.storage.from_(self.bucket_name).upload(name, file_data, file_options=file_options)

            if isinstance(response, dict) and "error" in response:
                raise Exception(response["error"]["message"])

            return name

        except Exception as e:
            raise Exception(f"Error uploading file to Supabase: {str(e)}")

    def _open(self, name, mode="rb"):
        """
        Retrieves the file from Supabase Storage.
        """
        try:
            response = supabase.storage.from_(self.bucket_name).download(name)
            if isinstance(response, dict) and "error" in response:
                raise Exception(response["error"]["message"])

            return BytesIO(response)  # Return file-like object

        except Exception as e:
            raise Exception(f"Error downloading file from Supabase: {str(e)}")

    def url(self, name):
        """Returns the public URL of the file."""
        if not name:
            return None
        return urljoin(f"{SUPABASE_URL}/storage/v1/object/public/{self.bucket_name}/", name.replace("\\", "/"))

    def exists(self, name):
        """Checks if the file already exists in Supabase Storage."""
        try:
            name = name.replace("\\", "/")  # Ensure correct path format
            response = supabase.storage.from_(self.bucket_name).list(path=name)

            if isinstance(response, dict) and "error" in response:
                raise Exception(response["error"]["message"])

            if isinstance(response, list) and response:
                return True  # If any file exists, return True

            return False

        except Exception as e:
            print(f"Error checking file existence: {str(e)}")
            return False
