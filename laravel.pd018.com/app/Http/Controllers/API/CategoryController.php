<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Validator;
use Storage;

class CategoryController extends Controller
{
    /**
     * @OA\Get(
     *     tags={"Category"},
     *     path="/api/category",
     *     @OA\Response(response="200", description="List Categories.")
     * )
     */
    public function index()
    {
        return response()->json(Category::all());
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $input = $request->all();
        $category = Category::update($input);

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
