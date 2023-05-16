<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Validator;
use Storage;
use DB;

class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Category"},
     *     path="/api/category",
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         required=true,
     *         @OA\Schema(
     *             type="string",
     *             default="1"
     *         ),
     *         description="Page number default 1"
     *     ),
     *     @OA\Response(response="200", description="List Categories.")
     * )
     */
    public function index()
    {
//        return response()->json(Category::all());
        $list = Category::paginate(2);
        return response()->json($list,200);
    }


    /**
     * @OA\Post(
     *     tags={"Category"},
     *     path="/api/category",
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"image", "name", "description"},
     *                 @OA\Property(
     *                     property="image",
     *                     type="string",
     *                     format="binary"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Add Category.")
     * )
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $messages = array(
            'name.required' => 'Вкажіть назву категорії!',
            'description.required' => 'Вкажіть опис категорії!'
        );
        $validator = Validator::make($input, [
            'name' => 'required',
            'description' => 'required'
        ], $messages);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        // store image file firstly
        $file = $request->file('image');
        $path = Storage::disk('public')->putFile('uploads', $file);
        //$url = Storage::disk('public')->url($path);

        $input["image"] = $path;
        $category = Category::create($input);
        return response()->json($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * @OA\Post(
     *     tags={"Category"},
     *     path="/api/category/{id}",
     *     @OA\Parameter(
     *          name="id",
     *          description="Category id to edit",
     *          required=true,
     *          in="path",
     *          @OA\Schema(
     *              type="integer"
     *          )
     *      ),
     *     @OA\RequestBody(
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 @OA\Property(
     *                     property="image",
     *                     type="string",
     *                     format="binary"
     *                 ),
     *                 @OA\Property(
     *                     property="name",
     *                     type="string"
     *                 ),
     *                 @OA\Property(
     *                     property="description",
     *                     type="string"
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(response="200", description="Success"),
     *     @OA\Response(response="400", description="Validation has fault"),
     * )
     */
    public function update(Request $request, string $id)
    {
        $input = $request->all();
        $messages = array(
            'image.image' => 'This file must be image type!',
            'image.max' => 'This size of this image must be less than 5MB!',
        );
        $validator = Validator::make($input, [
            'image' => 'image|max:5000',
        ], $messages);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        // take old value from database
        $category = DB::table('categories')->find($id);
        // if user request to edit image
        if($request->file('image') != null) {
//            $filename = File::basename(parse_url($category->image, PHP_URL_PATH));

            // delete previous from disk
            if(Storage::disk('public')->exists($category->image)) {
                Storage::disk('public')->delete($category->image);
            }

            $file = $request->file('image');
            $path = Storage::disk('public')->putFile('uploads', $file);

            $input["image"] = $path;
        }

        $category = Category::find($id);
        $category->update($input);

        return response()->json(['request'=>'edit by id','result'=>$category]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
